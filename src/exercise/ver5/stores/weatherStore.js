import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// API 키는 .env.local 에서 읽는다. (VITE_ 접두사가 있어야 클라이언트에서 접근 가능)
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// OpenWeatherMap 은 좌표로 조회하므로 도시별 위경도를 미리 정의한다.
// 응답의 name 은 영문("Seoul")으로 오기 때문에 화면에는 아래 name 을 사용한다.
const CITY_PRESETS = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
]

export const useWeatherStore = defineStore('weather', () => {
  // 1. state: 현재 날씨와 상세 정보는 API 응답으로 채워진다.
  const cities = ref([])
  const details = ref({})

  // 1-2. state: 5일 예보 API 응답 (도시 코드별로 보관)
  const forecasts = ref({})

  // 1-3. state: 과거 관측 기록은 무료 플랜에 해당 API 가 없어 Mock Data 를 유지한다.
  const pastRecords = ref({
    city_01: [
      { date: '2026-08-25', temp: 27, status: '맑음', humidity: '52%' },
      { date: '2026-08-24', temp: 29, status: '구름', humidity: '60%' },
      { date: '2026-08-23', temp: 31, status: '맑음', humidity: '48%' },
      { date: '2026-08-22', temp: 26, status: '비', humidity: '81%' },
      { date: '2026-08-21', temp: 25, status: '흐림', humidity: '70%' },
      { date: '2026-08-20', temp: 28, status: '구름', humidity: '63%' },
      { date: '2026-08-19', temp: 30, status: '맑음', humidity: '55%' },
      { date: '2026-08-18', temp: 32, status: '맑음', humidity: '45%' },
      { date: '2026-08-17', temp: 27, status: '비', humidity: '85%' },
      { date: '2026-08-16', temp: 24, status: '비', humidity: '90%' },
    ],
    city_02: [
      { date: '2026-08-25', temp: 25, status: '비', humidity: '84%' },
      { date: '2026-08-24', temp: 23, status: '비', humidity: '88%' },
      { date: '2026-08-23', temp: 28, status: '구름', humidity: '63%' },
      { date: '2026-08-22', temp: 27, status: '맑음', humidity: '55%' },
      { date: '2026-08-21', temp: 24, status: '흐림', humidity: '72%' },
      { date: '2026-08-20', temp: 26, status: '구름', humidity: '68%' },
      { date: '2026-08-19', temp: 29, status: '맑음', humidity: '57%' },
      { date: '2026-08-18', temp: 30, status: '맑음', humidity: '50%' },
      { date: '2026-08-17', temp: 25, status: '비', humidity: '86%' },
      { date: '2026-08-16', temp: 23, status: '흐림', humidity: '78%' },
    ],
    city_03: [
      { date: '2026-08-25', temp: 28, status: '구름', humidity: '66%' },
      { date: '2026-08-24', temp: 30, status: '맑음', humidity: '58%' },
      { date: '2026-08-23', temp: 29, status: '맑음', humidity: '61%' },
      { date: '2026-08-22', temp: 26, status: '비', humidity: '79%' },
      { date: '2026-08-21', temp: 27, status: '구름', humidity: '64%' },
      { date: '2026-08-20', temp: 29, status: '맑음', humidity: '60%' },
      { date: '2026-08-19', temp: 31, status: '맑음', humidity: '54%' },
      { date: '2026-08-18', temp: 28, status: '구름', humidity: '67%' },
      { date: '2026-08-17', temp: 26, status: '비', humidity: '83%' },
      { date: '2026-08-16', temp: 25, status: '비', humidity: '87%' },
    ],
  })

  // 1-4. state: 통신 상태
  const isLoading = ref(false)
  const errorMessage = ref('')

  // 2. getters: 도시 코드로 각 데이터를 조회한다.
  // 인자를 받아야 하므로 "함수를 반환하는 computed" 형태로 작성한다.
  const getCityById = computed(() => {
    return (cityId) => cities.value.find((city) => city.id === cityId) ?? null
  })

  const getDetailById = computed(() => {
    return (cityId) => details.value[cityId] ?? null
  })

  const getRecordsById = computed(() => {
    return (cityId) => pastRecords.value[cityId] ?? []
  })

  const getForecastById = computed(() => {
    return (cityId) => forecasts.value[cityId] ?? []
  })

  // 2-2. getters: 검색어를 포함하는 도시만 걸러서 리턴 (검색어가 없으면 전체)
  const searchCities = computed(() => {
    return (query) => {
      const keyword = query.trim()
      if (!keyword) return cities.value
      return cities.value.filter((city) => city.name.includes(keyword))
    }
  })

  // 2-3. getters: API 응답 전에도 도시 탭을 그릴 수 있도록 고정 목록을 노출한다.
  const cityPresets = computed(() => CITY_PRESETS)
  const hasData = computed(() => cities.value.length > 0)

  // 3. actions: 비동기 통신은 action 에서 처리한다.
  // 요구사항 1 - 현재 날씨 API 로 대시보드와 상세 데이터를 채운다.
  async function fetchCities() {
    if (isLoading.value) return
    if (!API_KEY) {
      errorMessage.value =
        'API 키가 없습니다. .env.local 에 VITE_OPENWEATHER_API_KEY 를 설정해 주세요.'
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
      // 도시 3곳을 동시에 요청해서 대기 시간을 줄인다.
      const responses = await Promise.all(
        CITY_PRESETS.map((city) =>
          axios.get(`${BASE_URL}/weather`, {
            params: { lat: city.lat, lon: city.lon, appid: API_KEY, units: 'metric', lang: 'kr' },
          }),
        ),
      )

      const nextCities = []
      const nextDetails = {}

      CITY_PRESETS.forEach((city, index) => {
        const data = responses[index].data

        nextCities.push({
          id: city.id,
          name: city.name,
          temp: Math.round(data.main.temp),
          status: data.weather[0].description,
        })

        nextDetails[city.id] = {
          name: city.name,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          tempMin: Math.round(data.main.temp_min),
          tempMax: Math.round(data.main.temp_max),
          status: data.weather[0].description,
          humidity: `${data.main.humidity}%`,
          wind: `${data.wind.speed}m/s`,
          country: data.sys.country,
        }
      })

      cities.value = nextCities
      details.value = nextDetails
    } catch (error) {
      errorMessage.value =
        '날씨 정보를 불러오지 못했습니다. API 키와 네트워크 상태를 확인해 주세요.'
      console.error('OpenWeatherMap 현재 날씨 조회 실패:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 요구사항 2 - 5일 예보 API 를 추가하여 기능을 확장한다.
  // 3시간 단위로 40건이 오므로 정오(12:00) 항목만 남겨 하루 1건으로 정리한다.
  async function fetchForecast(cityId) {
    const preset = CITY_PRESETS.find((city) => city.id === cityId)
    if (!preset) return
    if (!API_KEY) {
      errorMessage.value =
        'API 키가 없습니다. .env.local 에 VITE_OPENWEATHER_API_KEY 를 설정해 주세요.'
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: { lat: preset.lat, lon: preset.lon, appid: API_KEY, units: 'metric', lang: 'kr' },
      })

      const list = response.data.list
      const noon = list.filter((item) => item.dt_txt.endsWith('12:00:00'))
      // 조회 시각에 따라 정오 항목이 없을 수 있으므로 8건(24시간) 간격으로 대체한다.
      const picked = noon.length > 0 ? noon : list.filter((_, index) => index % 8 === 0)

      forecasts.value[cityId] = picked.map((item) => ({
        dateTime: item.dt_txt,
        date: item.dt_txt.slice(0, 10),
        temp: Math.round(item.main.temp),
        status: item.weather[0].description,
        humidity: `${item.main.humidity}%`,
      }))
    } catch (error) {
      errorMessage.value =
        '예보 정보를 불러오지 못했습니다. API 키와 네트워크 상태를 확인해 주세요.'
      console.error('OpenWeatherMap 예보 조회 실패:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    cities,
    details,
    forecasts,
    pastRecords,
    isLoading,
    errorMessage,
    getCityById,
    getDetailById,
    getRecordsById,
    getForecastById,
    searchCities,
    cityPresets,
    hasData,
    fetchCities,
    fetchForecast,
  }
})
