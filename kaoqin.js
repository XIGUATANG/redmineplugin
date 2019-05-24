function kaoqininit() {
  if (!formVue) return void init()
  formVue.$watch(
    'formData',
    newVal => {
      if (newVal.length) {
        if (new Date(formVue.Year) <= new Date('2018-08-01')) {
          return
        }
        let weekWorkTime = 0
        let weekLeaveTime = 0
        const workTimePerWeek = 45 * 60 * 60 * 1000
        Array.prototype.slice.call(document.querySelectorAll('#tbodyid td')).forEach((item, index) => {
          const dayInfo = newVal[index],
            day = parseInt(dayInfo.Day)
          ;(today = new Date().getDate()), (weekDay = new Date(new Date(formVue.Year).setDate(parseInt(day))).getDay())
          if (new Date(formVue.Year) < new Date() || (day && day < new Date().getDate())) {
            if (weekDay <= 5 && weekDay >= 1) {
              if (dayInfo.LeaveTheData) {
                const timeArr = dayInfo.LeaveTheData.match(/\d{1,2}:[0-5]\d/g)
                if (timeArr.length === 2) {
                  var leaveTime = timeSpan(timeArr[0], timeArr[1])
                  weekLeaveTime += Math.floor(leaveTime / (30 * 60 * 1000)) / 2
                }
              }
              let workTime = 0
              workTimeArr = dayInfo.CreditCardData.split('-')
              if (workTimeArr.length > 1) {
                workTime = timeSpan(workTimeArr[0], workTimeArr[workTimeArr.length - 1])
              }
              let timeToHour = 0
              if (dayInfo.AccountingWork) {
                timeToHour = Number((dayInfo.AccountingWork.match(/出勤工时[:：]*(\d+.\d+)/) || [])[1] || 0)
              }
              weekWorkTime += timeToHour
            }
          }
          if (weekDay === 6 && weekWorkTime !== 0) {
            try {
              item.querySelectorAll('br').forEach(br => item.removeChild(br))
            } catch (error) {}

            // const weekHours = Math.floor(weekWorkTime / (60 * 60 * 1000))
            // weekMinutes = Math.floor((weekWorkTime % (60 * 60 * 1000)) / (60 * 1000))
            var weekTipsElement = document.createElement('span')
            weekTipsElement.style.lineHeight = '20px'
            weekTipsElement.style.borderBottom = 'none'
            weekTipsElement.style.padding = '0'
            let htmlStr = `<i class="smallround" style="background-color: #FF0000;"></i>周出勤：${weekWorkTime}小时`
            if (weekLeaveTime) {
              htmlStr += `<br><i class="smallround" style="background-color:  #FF0000;"></i>调休/请假：${weekLeaveTime}小时`
            }
            let timeSpan = new Date(formVue.Year).setDate(parseInt(day)) - new Date()
            if (timeSpan > 0 && timeSpan < 5 * 24 * 60 * 60 * 1000 && weekWorkTime < 45) {
              htmlStr += `<br><i class="smallround" style="background-color:  #FF0000;"></i>本周还应出勤：${45 - weekWorkTime}小时`
            }
            weekTipsElement.innerHTML = htmlStr
            weekWorkTime = 0
            weekLeaveTime = 0
            item.appendChild(weekTipsElement)
          }
        })
      }
    },
    {
      immediate: true
    }
  )
}

function timeSpan(str1, str2) {
  return new Date('2018-08-07 ' + str2) - new Date('2018-08-07 ' + str1)
}

function appStart() {
  if (typeof formVue === 'undefined') {
    setTimeout(appStart, 1000)
  } else {
    kaoqininit()
  }
}
appStart()
