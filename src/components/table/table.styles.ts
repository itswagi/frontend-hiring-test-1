import { Button, Flex } from 'antd'
import styled from 'styled-components'

const Colors = {
  Primary: '#325AE7',
  Warning: '#C91D3E',
  Success: '#1DC9B7',
}

const ValueType = {
  voicemail: Colors.Primary,
  missed: Colors.Warning,
  answered: Colors.Success,
  inbound: Colors.Primary,
  outbound: Colors.Primary,
}

export const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled('thead')``

export const TableRow = styled('tr')`
  background-color: #f4f4f9;
  border: 1px solid #cbd6e2;
  & :first-child {
    padding: 0 0 0 27px;
  }
`

export const TableHead = styled('th')`
  color: #232323;
  font-family: var(--font-inter);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  padding: 14px 0;
  text-align: left;
  & div {
    padding-left: 0px !important;
  }
`

export const TableBody = styled('tbody')`
  border: 1px solid #cbd6e2;
  border-top: none;
  border-bottom: none;
`

export const TableBodyRow = styled('tr')`
  border-bottom: 1px solid #cbd6e2;
  > * {
      &:first-child {
    padding: 0 0 0 27px;
  }
`
export const TableData = styled('td')<{ type: keyof typeof ValueType }>`
  color: ${(props) => {
    return props.type ? ValueType[props.type] : '#232323'
  }};
  padding: 28px 0;
  text-align: left;
  font-family: var(--font-inter);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  .subText {
    color: #325ae7;
  }
  .badge {
    padding: 4px 8px;
    background-color: rgba(114, 114, 114, 0.12);
    color: #727272;
    border-radius: 2px;
    width: fit-content;
    cursor: pointer;
    &.archived {
      background-color: rgba(29, 201, 183, 0.08);
      color: #1dc9b7;
    }
  }
`

export const ActionButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4f46f8 !important;
  border-radius: 4px !important;
  padding: 9px 4px;
  color: white !important;
  &:hover {
    color: white !important;
    cursor: pointer;
  }
`

export const PaginationButton = styled(Button)<{ active: boolean }>`
  font-family: --var(font-inter) !important;
  font-size: 10px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  background-color: ${(props) => (props.active ? '#4f46f8!important' : 'none')};
  padding: 3px 0 !important;
  border-radius: 4px !important;
  border: none !important;
  width: 20px !important;
  height: 20px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  color: ${(props) => (props.active ? 'white !important' : '#000')};
  height: initial !important;
  &:hover {
    color: ${(props) => (props.active ? 'white !important' : '#000')};
    cursor: pointer;
  }
`

export const PaginationWrapper = styled('div')`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

export const PaginationArrows = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
