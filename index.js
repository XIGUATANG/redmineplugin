async function autoLogin() {
  const username = localStorage.getItem('username'),
    pwd = localStorage.getItem('pwd')
  let inputUserName = document.querySelector('#username'),
    inputPwd = document.querySelector('#password')
  inputUserName && username && (inputUserName.value = username)
  inputPwd && pwd && (inputPwd.value = pwd)
}

function saveLogin() {
  let submitBtn = document.getElementById('login-submit')
  submitBtn &&
    submitBtn.addEventListener('click', () => {
      let username = document.getElementById('username').value,
        pwd = document.getElementById('password').value
      localStorage.setItem('username', username)
      localStorage.setItem('pwd', pwd)
    })
}
if (location.pathname === '/redmine/login') {
  autoLogin()
  saveLogin()
}
if (/\/redmine\/issues\/\d+/.test(location.pathname)) {
  document.querySelector('#content .icon-edit').addEventListener('click', () => {
    setTimeout(() => editIssue(), 200)
  })
}

Date.prototype.format = dateFormat

function editIssue() {
  let status,
    assigner,
    reporter,
    statusSelect = document.getElementById('issue_status_id'),
    assignerSelect = document.getElementById('issue_assigned_to_id'),
    reporterSelect = document.getElementById('issue_custom_field_values_21')
  if (statusSelect) status = statusSelect.value
  if (assignerSelect) assigner = assignerSelect.value
  if (reporterSelect) reporter = reporterSelect.value
  if (!['1', '10'].includes(status)) return ''
  statusSelect.value = '3'
  statusSelect.dispatchEvent(new Event('change'))
  setTimeout(() => {
    let resolverSlect = document.getElementById('issue_custom_field_values_18')
    statusSelect = document.getElementById('issue_status_id')
    assignerSelect = document.getElementById('issue_assigned_to_id')
    reporterSelect = document.getElementById('issue_custom_field_values_21')
    dateInput = document.getElementById('issue_custom_field_values_19')
    if (resolverSlect) resolverSlect.value = assigner || ''
    if (assignerSelect) assignerSelect.value = reporter || ''
    console.log(assignerSelect, reporter)
    let doneSelect = document.getElementById('issue_done_ratio')
    if (doneSelect) doneSelect.value = '100'
    if (dateInput) dateInput.value = new Date().format()
  }, 500)
}

function dateFormat(fmt = 'yyyy-MM-dd') {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}

function getStorage(...keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, function(result) {
      resolve(keys.map(key => result[key]))
    })
  })
}
