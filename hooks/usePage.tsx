"use client"

import * as REACT from "react"

enum ResponsiveValues {
  Mobile = "mobile", 
  Tablet = "tablet",
  Laptop = "laptop",
  Desktop = "desktop"
}

type WindowType = {
  width: number,
  height: number
  scrollY: number
}

export type usePageReturn = {
  isMounted: boolean,
  responsiveInfo: ResponsiveValues,
  windowInfo: WindowType,
}

function usePage(){
  const [responsiveInfo, setResponciveInfo] = REACT.useState<ResponsiveValues>(ResponsiveValues.Mobile)
  const [windowInfo, setWindowInfo] = REACT.useState<WindowType | null>(null)
  const [isMounted, setIsMounted] = REACT.useState(false)

  REACT.useEffect(() => {
    setIsMounted(true)
  }, [])

  function updateResponsiveInfo(){
    let windowWidth = window.innerWidth

    if ( windowWidth <= 767 ) {
      setResponciveInfo(ResponsiveValues.Mobile)
    } 
    else if ( windowWidth >= 768 && windowWidth <= 1023) {
      setResponciveInfo(ResponsiveValues.Tablet)
    }
    else if ( windowWidth >= 1024 && windowWidth <= 1279) {
      setResponciveInfo(ResponsiveValues.Laptop)
    }
    else {
      setResponciveInfo(ResponsiveValues.Desktop)
    }
  }

  function updateScrollWindow(){
    let scrollY = window.scrollY

    setWindowInfo((prev) => {
      if(!prev) return null

      return {
        ...prev,
        scrollY }
    })
  }


  // Event Listener relative to the page
  REACT.useEffect(() => {
    if ( !isMounted ) return

    updateResponsiveInfo()
    updateScrollWindow()

    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    setWindowInfo({
      width: windowWidth,
      height: windowHeight,
      scrollY: 0
    })

    // Update Responcive when the page is resize
    window.addEventListener("resize", updateResponsiveInfo)
    window.addEventListener("scroll", updateScrollWindow)

    return () => {
      window.removeEventListener("resize", updateResponsiveInfo)
      window.removeEventListener("scroll", updateScrollWindow)
    }
  }, [isMounted])



  // Debugging
  // REACT.useEffect(() => {
  // }, [])


  return { responsiveInfo, windowInfo, isMounted } as usePageReturn
}

export { usePage, ResponsiveValues }
