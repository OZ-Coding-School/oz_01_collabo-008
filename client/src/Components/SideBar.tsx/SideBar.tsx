import { AnimatedLineProgressBar } from '@frogress/line';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Budget, fixedText, fixedWrap, list, listItem, listItems, progress, sideBox, spendingText, spendingTextwrap, totalTextWrap, wonText } from './SideBar.css';
const SideBar = () => {
  return (
    <Box width="500px" className={sideBox}>
      <Card size="5">
        <Flex gap="4" align="center">
          <Box className={totalTextWrap}>
            <Text as="div" weight="bold">
              이번 달 총 예산
            </Text>
            <Text as="div" className={Budget}>
              700,000
              <Text as='span' className={wonText}>원</Text>
            </Text>
          </Box>
        </Flex>
        <Flex gap="4" direction="column">
          <Box className={spendingTextwrap}>
            <Text as='p'>전체 예산의
              <Text as='span' className={spendingText}>175,000</Text>
              원을 사용했어요
            </Text>
          </Box>
          {/* <Box className={progress}>여러분 여기는 프로그래스바입니다</Box> */}
          <AnimatedLineProgressBar
            percent={48}
            transition={{ easing: 'linear' }}
            rounded={36}
            progressColor="linear-gradient(to right, #F03167, #F35F89, #FFA5BE)"
            containerColor="#fff"
            width={400}
            height={48}
            className={progress}
          // label={(value: number) => <CustomLabelComponent percent={value} />}
          />
        </Flex>

        <Box className={fixedWrap}>
          <Text className={fixedText}>고정지출</Text>
          <ul className={list}>
            <li className={listItems}>
              <Text as='p' className={listItem}>식비</Text>
              <Text as='p'>200,000</Text>
            </li>
            <li className={listItems}>
              <Text as='p' className={listItem}>공과금</Text>
              <Text as='p'>400,000</Text>
            </li>
          </ul>
        </Box>
      </Card>
    </Box>
  )
}

export default SideBar
