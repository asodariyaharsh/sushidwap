import Desktop from 'app/components/Header/Desktop'
import Mobile from 'app/components/Header/Mobile'
import Main from 'app/components/Main'
import Popups from 'app/components/Popups'
import useDesktopMediaQuery from 'app/hooks/useDesktopMediaQuery'

// @ts-ignore TYPE NEEDS FIXING
const Layout = ({ children }) => {
  const isDesktop = useDesktopMediaQuery()
  return (
    <div className="z-0 flex flex-col items-center w-full h-screen">
      {isDesktop ? (
        <Desktop>
          <Main>{children}</Main>
          <Popups />
        </Desktop>
      ) : (
        <>
          <Mobile></Mobile>
          <Main>{children}</Main>
          <Popups />
        </>
      )}
    </div>
  )
}

export default Layout
