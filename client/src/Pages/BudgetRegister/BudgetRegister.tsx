import { Box, Card } from '@radix-ui/themes';
import { useState } from 'react';
import BudgetRegTable from '../../components/BudgetRegTable/BudgetRegTable';
import { addBtn, btnWrap, container, description, title, titleWrap, wrap } from './BudgetRegister.css';

interface Row {
  item: string;
  amount: number;
}


const BudgetRegister = () => {
  const [rows, setRows] = useState<Row[]>([{ item: '', amount: 0 }]);


  // 새 행 추가 함수
  const addRow = () => {
    const newRow = { item: '', amount: 0 }; // 새 행 기본 구조
    setRows([...rows, newRow]); // 기존 행에 새 행 추가
  };

  return (

    <div className={wrap}>


      <Box className={container}>
        <Card size="3">
          <div className={titleWrap}>
            <p className={title}>가계부 등록</p>
            <p className={description}>오늘 지출한 금액을 등록해보세요</p>
          </div>
          <div className={btnWrap}>

            <button className={addBtn} onClick={addRow}> 행 추가하기</button>
          </div>

          <BudgetRegTable rows={rows} />
          <div className={btnWrap}>

            <button className={addBtn} > 등록하기</button>
          </div>
        </Card>
      </Box>



    </div>

  )
}

export default BudgetRegister