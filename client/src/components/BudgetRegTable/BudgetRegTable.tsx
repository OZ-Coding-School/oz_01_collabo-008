import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Box } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import instance from "../../api/axios";
import categoriesRequest from "../../api/categoriesRequest";
import Input from "../Input/Input";
import SelectBox from "../SelectBox/Select";
import { datepicker, wrap } from "./BudgetRegTable.css";

interface ItemType {
  id: number;
  content: number;
}


interface Payment extends ItemType {
  type: string
}
interface RowType {
  date: Date;
  category: string;
  payment: string;
  location: string;
  price: number;
  content: string;
}

interface Props {
  rows: RowType[];
  onTableRowChange: (index: number, field: keyof RowType, value: string | number | Date) => void;

  handlePaymentChange: (value: string) => void;
  handleCategoryChange: (value: string) => void;
  selectedCategory: string;
  selectedPayment: string;
  setStartDate: (date: Date) => void;
  startDate: Date;
}


const BudgetRegTable = ({ rows, onTableRowChange, handlePaymentChange, handleCategoryChange, selectedCategory, selectedPayment, startDate, setStartDate }: Props) => {




  // 카테고리 
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await instance.get(categoriesRequest.category);
        const data = response.data.categories
        console.log("카테고리 조회 성공", data)
        return data
      } catch (error) {
        throw new Error("카테고리 조회 에러")
      }
    }
  })

  const options = data?.map((item: ItemType) => ({
    value: item.id,
    label: item.content
  }));


  //지불방법
  const { data: paymentData, isLoading: isPaymentLoading, error: paymentError } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const response = await instance.get(categoriesRequest.payment);
        const data = response.data.payments
        console.log("지불방법", data)
        return data
      } catch (error) {
        throw new Error("카테고리 조회 에러")
      }
    }
  })

  const payment = paymentData?.map((item: Payment) => ({
    value: item.id,
    label: item.type
  }))


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error:{error.message}</div>

  if (isPaymentLoading) return <div>Loading...</div>
  if (paymentError) return <div>Error:{paymentError.message}</div>





  return (

    <>

      <Box className={wrap} style={{ maxHeight: "600px", overflowY: "auto" }}>
        <TableContainer >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>사용날짜</StyledTableCell>
                <StyledTableCell align="left">카테고리</StyledTableCell>
                <StyledTableCell align="left">카드/현금</StyledTableCell>
                <StyledTableCell align="left">사용처</StyledTableCell>
                <StyledTableCell align="left">사용금액</StyledTableCell>
                <StyledTableCell align="left">사용내역</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows.map((row: RowType, index) => (

                <StyledTableRow key={index} >
                  <StyledTableCell component="th" scope="row">
                    <DatePicker
                      className={datepicker}
                      showIcon
                      selected={startDate}
                      onChange={(date) => {
                        if (date instanceof Date) { // date가 Date 인스턴스인지 확인
                          setStartDate(date); //
                          onTableRowChange(index, 'date', date); // Date 객체를 직접 전달
                        }
                      }}
                    />

                  </StyledTableCell>

                  <StyledTableCell align="left">


                    <SelectBox defaultValue={selectedCategory} options={options} onChange={(value) => handleCategoryChange(value)} />


                  </StyledTableCell>
                  <StyledTableCell align="left">

                    <SelectBox defaultValue={selectedPayment} options={payment} onChange={(value) => handlePaymentChange(value)} />

                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Input placeholder="사용처" onChange={(e) => {
                      const { value } = e.target;
                      onTableRowChange(index, 'location', value);
                    }} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Input placeholder="사용금액" type="number" onChange={(e) => {
                      const { value } = e.target;
                      onTableRowChange(index, 'price', value);
                    }} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Input placeholder="사용내역" onChange={(e) => {
                      const { value } = e.target;
                      onTableRowChange(index, 'content', value);
                    }} />
                  </StyledTableCell>

                </StyledTableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>

  )
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    borderBottom: "2px solid #FFF4F5",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white", // 짝수 번째 행의 배경색
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#FFF4F5", // 홀수 번째 행의 배경색
  },
  // 마지막 테두리 숨기기
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& td, & th': {
    borderBottom: `none`, // 경계선의 색상과 두께 조정
  },
}));

export default BudgetRegTable