import { takeEvery, put, select, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLoading, setError, setCompleted } from '../slices/onboardingSlice'
import { RootState } from '../index'
import { FormattedOnboardingData } from '../../types'

const ONBOARDING_DATA_KEY = 'onboarding_data'

function* saveOnboardingDataSaga(): Generator<any, void, any> {
  try {
    yield put(setLoading(true))
    const state: RootState = yield select((state: RootState) => state)

    const dataToSave: FormattedOnboardingData = {
      health_concerns: state.onboarding.prioritizedConcerns.map(
        (concern, index) => ({
          ...concern,
          priority: index + 1,
        }),
      ),
      diets: state.onboarding.selectedDiets,
      is_daily_exposure: state.onboarding.isDailyExposure,
      is_smoke: state.onboarding.isSmoke,
      alcohol: state.onboarding.alcohol,
      allergies: state.onboarding.allergies,
      custom_allergies: state.onboarding.customAllergies,
      timestamp: new Date().toISOString(),
    }

    yield call(
      AsyncStorage.setItem,
      ONBOARDING_DATA_KEY,
      JSON.stringify(dataToSave),
    )

    // Print to console as required
    console.log('=== ONBOARDING DATA ===')
    console.log(JSON.stringify(dataToSave, null, 2))
    console.log('=====================')

    yield put(setCompleted(true))
    yield put(setLoading(false))
  } catch (error: any) {
    console.error('Error saving onboarding data:', error)
    yield put(setError(error.message))
    yield put(setLoading(false))
  }
}

function* loadOnboardingDataSaga(): Generator<any, void, any> {
  try {
    const data: string | null = yield call(
      AsyncStorage.getItem,
      ONBOARDING_DATA_KEY,
    )
    if (data) {
      const parsedData: FormattedOnboardingData = JSON.parse(data)
      console.log('Loaded onboarding data:', parsedData)
    }
  } catch (error: any) {
    console.error('Error loading onboarding data:', error)
  }
}

export function* onboardingSaga(): Generator<any, void, any> {
  yield takeEvery('onboarding/saveData', saveOnboardingDataSaga)
  yield takeEvery('onboarding/loadData', loadOnboardingDataSaga)
}
