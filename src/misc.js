import Swal from 'sweetalert2'

export const BootstrapButtons = Swal.mixin({
  customClass: { confirmButton: 'swal btn btn-primary' },
  buttonsStyling: false
})

export const valid = () => {
  var result = true
  Array.from(document.querySelectorAll('input'))
    .forEach(i => { if (!i.checkValidity()) result = false })
  return result
}

export const post = (url, data) => {
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export const checkTime = () => {
  var date = new Date();
  var hour = date.getUTCHours();
  var day = date.getDay();
  if (hour >= 1 && hour <= 8 && day >= 1 && day <= 5)
    return true
  return false
}

export const color = (last, value) => {
  if (value == undefined)
    if (last < 0) return { color: 'green' }
    else if (last > 0) return { color: 'red' }
  if (last < value) return { color: 'red' }
  else if (last > value) return { color: 'green' }
}

export const timeLabels = (start, end) => {
  var times = [];
  for (var i = 0; start <= end; i++) {
    times[i] = `${Math.floor(start / 60).toString().padStart(2, '0')}:${(start % 60).toString().padStart(2, '0')}`
    start++
  }
  return times
}
