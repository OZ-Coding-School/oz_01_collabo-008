import { Box } from "@radix-ui/themes"
import SideBar from "../SideBar.tsx/SideBar"
import { wrap } from "./BaseContainer.css"

const BaseContainer = () => {
  return (
    <Box className={wrap}>
      <SideBar />

    </Box>
  )
}

export default BaseContainer