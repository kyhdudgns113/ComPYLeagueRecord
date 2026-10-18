import * as S from '@secret'

export const getFailResponse = (errObj: any) => {
  const gkdErrMsg = errObj.gkdErrMsg || `서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`
  const statusCode = errObj.statusCode || 500

  /**
   * jwtFromServer 를 빈 문자열로 처리해도 된다.
   * - 빈 문자열이면 안되는 경우는 controller 에서 이 값을 안 쓴다.
   */
  const jwtFromServer = ''

  if (S.DEBUG_MODE) {
    console.log(`\ngkdErrMsg: ${gkdErrMsg}`)
    console.log(`errObj: ${errObj}`)

    Object.keys(errObj).forEach(key => {
      console.log(`   ${key}: ${errObj[key]}`)
    })
  }
  return {ok: false, body: {}, gkdErrMsg, statusCode, jwtFromServer}
}
