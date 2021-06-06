export default function ({ $inputmask, redirect }) {
  $inputmask.onError(error => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}