import { AnimatedLineProgressBar } from '@frogress/line';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import instance from '../../api/axios';
import budgetRegRequest from '../../api/budgetRegRequest';
import FixedExpenses from './FixedExpenses/FixedExpenses';
import { Budget, progress, sideBox, spendingText, spendingTextwrap, totalTextWrap, wonText } from './SideBar.css';

interface ItemType {
  id: number;
  created_at: string;
  value: number;
}

const SideBar = () => {
  const [year] = useState(new Date().getFullYear())
  const [month] = useState(new Date().getMonth() + 1)
  const memberId = localStorage.getItem("memberId")

  // 전체예산
  const { data: budgetList, isLoading: isBudgetLoading, error: budgetError } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => {
      try {
        const response = await instance.get(budgetRegRequest.budgetList + `/${memberId}?year=${year}&month=${month}`)
        const data = response.data.budget_list
        return data
      } catch (error) {
        throw new Error("전체예산 에러");
      }
    }
  })

  if (isBudgetLoading) return <div>Loading...</div>;
  if (budgetError) return <div>Error:{budgetError.message}</div>;
  if (!budgetList || budgetList.length === 0) return <div className={Budget} >0</div>;

  // 데이터 created_at 기준으로 내림차순 정렬
  const sortedData: ItemType[] = [...budgetList].sort((a: ItemType, b: ItemType) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  // 가장 최신 데이터 선택
  const latestData = sortedData[0];



  return (
    <Box width="500px" className={sideBox}>
      <Card size="5">

        <Flex gap="4" align="center">
          <Box className={totalTextWrap}>
            <Text as="div" weight="bold">
              이번 달 총 예산
            </Text>
            <Text as="div" className={Budget} key={latestData.id}>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >

                {latestData.value.toLocaleString()}
              </motion.p>
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

        <FixedExpenses />
      </Card>
    </Box>
  )
}

export default SideBar
