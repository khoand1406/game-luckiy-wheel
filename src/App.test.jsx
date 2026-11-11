import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './AppPuzzleWheel'

describe('Mật mã Tổ ấm', () => {
  it('shows the stacked keyword board and reward wheel', () => {
    render(<App />)
    expect(screen.getByText('Bảng từ khóa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /quay quà/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /từ khóa/i })).toHaveLength(11)
  })

  it('follows reward, keyword, answer flow', () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /quay quà/i }))
    act(() => vi.advanceTimersByTime(2500))
    expect(screen.getByText('Bút highlight')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /chọn một từ khóa/i }))
    fireEvent.click(screen.getByRole('button', { name: 'Từ khóa 1' }))
    fireEvent.click(screen.getByRole('button', { name: /gia đình/i }))
    expect(screen.getByText(/chính xác — nhận bút highlight/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /mở hàng từ khóa/i }))
    expect(screen.getByRole('button', { name: /từ khóa 1, đáp án gia đình/i })).toBeInTheDocument()
    vi.useRealTimers()
  })
})
