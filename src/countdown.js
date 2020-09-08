import React from 'react'

function Countdown() {
  const [remainingTime, setRemainingTime] = React.useState(10000)
  const end = React.useRef(new Date().getTime() + remainingTime)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = end.current - new Date().getTime()
      if (newRemainingTime <= 0) {
        clearInterval(interval)
        setRemainingTime(0)
      } else {
        setRemainingTime(newRemainingTime)
      }
    })
    // test still passes when we comment this out & DO NOT CLEAN UP
    // this is why it's important you make sure you can break your test
    // it takes so long for 10 sec to happen that our test finishes and everything goes away before Jest notices there's a prooblem
    return () => clearInterval(interval)
  }, [])
  return remainingTime
}

export {Countdown}
