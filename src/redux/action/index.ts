export const updataPath = (path: string) => {
  return (dispatch: any) => {
    console.log(path)
    dispatch({
      type: 'setPath',
      path: path
    })
  }
}