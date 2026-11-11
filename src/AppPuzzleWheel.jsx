import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Gift, Home, Maximize2, MousePointer2, RefreshCw, RotateCcw, Sparkles, X } from 'lucide-react'
import puzzle from './data/puzzleQuestions.json'
import rewards from './data/rewards.json'

const LETTERS = ['A', 'B', 'C', 'D']
const ANCHOR = 5

function Brand() {
  return <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-white shadow-card"><Gift size={21} /></div><div><div className="font-display text-lg font-extrabold leading-none text-forest">Mật mã Tổ ấm</div><div className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-moss/60">Chương 7 • MLN131</div></div></div>
}

function Steps({ phase }) {
  const steps = [{ id: 'reward', label: 'Quay phần quà', icon: Gift }, { id: 'board', label: 'Chọn từ khóa', icon: MousePointer2 }, { id: 'question', label: 'Trả lời', icon: Check }]
  const current = phase === 'rewardResult' ? 0 : phase === 'board' ? 1 : phase === 'question' ? 2 : 0
  return <div className="flex items-center gap-1 rounded-2xl bg-white/75 p-1.5 shadow-sm">{steps.map((step, index) => { const Icon = step.icon; return <div key={step.id} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold ${index === current ? 'bg-forest text-white' : index < current ? 'text-moss' : 'text-forest/30'}`}><Icon size={14} /><span className="hidden sm:inline">{index + 1}. {step.label}</span><span className="sm:hidden">{index + 1}</span></div> })}</div>
}

function PuzzleRow({ row, index, solved, active, selectable, onClick }) {
  const offset = (ANCHOR - row.keyIndex) * 31
  return (
    <button aria-label={`Từ khóa ${index + 1}${solved ? `, đáp án ${row.answer}` : ''}`} disabled={solved || !selectable} onClick={onClick} className={`flex w-full items-center gap-2 rounded-xl border px-2 py-1.5 text-left transition ${active ? 'border-gold bg-gold/10' : solved ? 'border-moss/20 bg-moss/5' : selectable ? 'border-forest/10 bg-white hover:-translate-y-0.5 hover:border-coral/50 hover:shadow-card' : 'border-forest/5 bg-white/45'} disabled:cursor-default`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black ${solved ? 'bg-moss text-white' : selectable ? 'bg-coral text-white' : 'bg-forest/10 text-forest/35'}`}>{solved ? <Check size={15} /> : index + 1}</span>
      <span className="flex min-w-0 flex-1 gap-[3px]" style={{ paddingLeft: `${offset}px` }}>
        {[...row.cells].map((letter, letterIndex) => {
          const keyCell = letterIndex === row.keyIndex
          return <span key={letterIndex} className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border-b-2 text-xs font-black md:h-8 md:w-8 md:text-sm ${keyCell ? 'border-coral bg-coral/15 text-coral' : 'border-forest/15 bg-cream text-forest'} ${!solved ? 'text-transparent' : ''}`}>{solved ? letter : '•'}</span>
        })}
      </span>
    </button>
  )
}

function PuzzleBoard({ solved, active, selectable, onSelect }) {
  return (
    <section className="rounded-[2rem] border border-forest/10 bg-white/65 p-4 shadow-soft md:p-5">
      <div className="mb-3 flex items-end justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-[.18em] text-coral">11 hàng ngang • 1 mật mã dọc</div><h1 className="mt-1 font-display text-2xl font-extrabold text-forest md:text-3xl">Bảng từ khóa</h1></div><div className="text-right text-xs font-bold text-moss/55">{solved.filter(Boolean).length}/11 đã mở</div></div>
      <div className="space-y-1.5 overflow-x-auto pb-1">{puzzle.rows.map((row, index) => <PuzzleRow key={row.id} row={row} index={index} solved={solved[index]} active={active === index} selectable={selectable} onClick={() => onSelect(index)} />)}</div>
      <div className="mt-4 rounded-2xl bg-forest p-3 text-white"><div className="text-center text-[10px] font-black uppercase tracking-[.18em] text-white/45">Từ khóa đặc biệt</div><div className="mt-2 flex justify-center gap-1">{[...puzzle.secret].map((letter, index) => <span key={index} className={`grid h-8 w-7 place-items-center rounded-lg font-black ${solved[index] ? 'bg-white text-forest' : 'bg-white/10 text-white/20'}`}>{solved[index] ? letter : '?'}</span>)}</div><div className="mt-2 text-center text-xs font-bold text-gold">{solved.every(Boolean) ? puzzle.secretDisplay : 'Chủ đề đang chờ được giải mã'}</div></div>
    </section>
  )
}

function RewardWheel({ rotation, spinning, onSpin, result }) {
  const gradient = `conic-gradient(${rewards.map((reward, index) => `${reward.color} ${index * (360 / rewards.length)}deg ${(index + 1) * (360 / rewards.length)}deg`).join(',')})`
  return (
    <div className="text-center">
      <div className="text-xs font-black uppercase tracking-[.16em] text-coral">Bước 1 • Phần quà đang chờ</div><h2 className="mt-1 font-display text-3xl font-extrabold text-forest">Quay phần quà</h2>
      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[390px]">
        <div className="absolute left-1/2 top-[-5px] z-20 -translate-x-1/2"><div className="h-0 w-0 border-x-[17px] border-t-[30px] border-x-transparent border-t-forest" /></div>
        <div className="absolute inset-3 rounded-full border-[8px] border-white shadow-soft transition-transform duration-[2400ms] ease-[cubic-bezier(.12,.7,.08,1)]" style={{ transform: `rotate(${rotation}deg)`, background: gradient }}>
          <div className="relative h-full w-full rounded-full border-4 border-white/30">{rewards.map((reward, index) => { const angle = index * (360 / rewards.length) + 360 / rewards.length / 2; return <span key={reward.id} className="absolute left-1/2 top-1/2 text-2xl drop-shadow" style={{ transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(-125px) rotate(${-angle}deg)` }}>{reward.icon}</span> })}<div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[7px] border-white bg-forest text-white"><Gift size={30} /></div></div>
        </div>
      </div>
      {!result ? <button disabled={spinning} onClick={onSpin} className="mt-2 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 font-extrabold text-white shadow-soft disabled:bg-forest/30"><RefreshCw className={spinning ? 'animate-spin' : ''} size={19} /> {spinning ? 'Đang quay...' : 'QUAY QUÀ'}</button> : <div className="mx-auto mt-3 max-w-sm animate-pop rounded-2xl bg-gold/15 p-4"><div className="text-3xl">{result.icon}</div><div className="mt-1 text-xs font-black uppercase tracking-[.12em] text-coral">Phần quà đang treo</div><div className="mt-1 font-display text-2xl font-extrabold text-forest">{result.label}</div></div>}
    </div>
  )
}

function QuestionPanel({ row, selected, onSelect, onContinue, onSkip, reward }) {
  const revealed = selected !== null
  const correct = selected === row.correct
  return (
    <div>
      <div className="text-xs font-black uppercase tracking-[.16em] text-coral">Bước 3 • Câu hỏi từ khóa {row.id}</div><h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-forest">{row.question}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{row.options.map((option, index) => { const isCorrect = revealed && index === row.correct; const isWrong = revealed && selected === index && index !== row.correct; return <button key={option} disabled={revealed} onClick={() => onSelect(index)} className={`flex min-h-20 items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${isCorrect ? 'border-moss bg-moss/10' : isWrong ? 'border-coral bg-coral/10' : 'border-forest/10 bg-cream/50 hover:-translate-y-0.5 hover:border-gold'} disabled:cursor-default`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-black ${isCorrect ? 'bg-moss text-white' : isWrong ? 'bg-coral text-white' : 'bg-white text-forest'}`}>{isCorrect ? <Check size={16} /> : isWrong ? <X size={16} /> : LETTERS[index]}</span><span className="pt-1 font-semibold text-ink">{option}</span></button> })}</div>
      {revealed ? <div className={`mt-5 rounded-2xl p-5 ${correct ? 'bg-moss/10' : 'bg-coral/10'}`}><div className={`font-extrabold ${correct ? 'text-moss' : 'text-coral'}`}>{correct ? `Chính xác — nhận ${reward.label}!` : 'Chưa chính xác — phần quà chưa được mở.'}</div><p className="mt-2 text-sm leading-6 text-ink/70">{row.explanation}</p><button onClick={() => onContinue(correct)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3.5 font-extrabold text-white">{correct ? 'Mở hàng từ khóa & trao quà' : 'Mở đáp án & sang lượt mới'} <ArrowRight size={18} /></button></div> : <button onClick={onSkip} className="mt-4 text-sm font-bold text-moss/60 underline decoration-moss/25 underline-offset-4">Bỏ qua câu này và mở đáp án</button>}
    </div>
  )
}

function Game() {
  const [phase, setPhase] = useState('reward')
  const [solved, setSolved] = useState(() => puzzle.rows.map(() => false))
  const [active, setActive] = useState(null)
  const [selected, setSelected] = useState(null)
  const [reward, setReward] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])
  function spinReward() { if (spinning) return; const index = Math.floor(Math.random() * rewards.length); const slice = 360 / rewards.length; const normalized = ((rotation % 360) + 360) % 360; const desired = (360 - (index * slice + slice / 2)) % 360; const align = (desired - normalized + 360) % 360; setRotation(rotation + 5 * 360 + align); setSpinning(true); timeoutRef.current = window.setTimeout(() => { setReward(rewards[index]); setSpinning(false); setPhase('rewardResult') }, 2400) }
  function selectRow(index) { if (solved[index]) return; setActive(index); setSelected(null); setPhase('question') }
  function finish(correct) { setSolved((old) => old.map((value, index) => index === active ? true : value)); setActive(null); setSelected(null); setReward(null); setPhase('reward') }
  function reset() { window.clearTimeout(timeoutRef.current); setPhase('reward'); setSolved(puzzle.rows.map(() => false)); setActive(null); setSelected(null); setReward(null); setRotation(0); setSpinning(false) }
  const complete = solved.every(Boolean)

  return (
    <main className="paper-grain min-h-screen bg-cream pb-8">
      <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 px-4 py-4 md:px-7"><Brand /><Steps phase={phase} /><div className="flex gap-2"><button onClick={reset} title="Làm mới" className="grid h-10 w-10 place-items-center rounded-xl border border-forest/10 bg-white text-moss"><RotateCcw size={17} /></button><button onClick={() => document.documentElement.requestFullscreen?.()} title="Toàn màn hình" className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-white"><Maximize2 size={17} /></button></div></header>
      <div className="mx-auto grid w-full max-w-[1500px] items-start gap-5 px-4 md:px-7 lg:grid-cols-[minmax(600px,1.05fr)_minmax(420px,.95fr)]">
        <PuzzleBoard solved={solved} active={active} selectable={phase === 'board'} onSelect={selectRow} />
        <section className="min-h-[580px] rounded-[2rem] border border-forest/10 bg-white p-5 shadow-soft md:p-7">
          {complete ? <div className="grid min-h-[520px] place-items-center text-center"><div><div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.5rem] bg-coral text-white"><Sparkles size={38} /></div><div className="mt-6 text-xs font-black uppercase tracking-[.18em] text-coral">Đã giải mã chủ đề</div><h2 className="mt-2 font-display text-5xl font-extrabold text-forest">{puzzle.secretDisplay}</h2><p className="mx-auto mt-4 max-w-md leading-7 text-ink/65">Gia đình Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội được xây dựng trên những giá trị tiến bộ, bình đẳng, văn hóa và hạnh phúc.</p><button onClick={reset} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-forest px-6 py-4 font-extrabold text-white"><RotateCcw size={18} /> Chơi lại</button></div></div> : phase === 'reward' || phase === 'rewardResult' ? <><RewardWheel rotation={rotation} spinning={spinning} onSpin={spinReward} result={reward} />{phase === 'rewardResult' && <button onClick={() => setPhase('board')} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-4 font-extrabold text-white">Chọn một từ khóa <ArrowRight size={18} /></button>}</> : phase === 'board' ? <div className="grid min-h-[520px] place-items-center text-center"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gold/15 text-gold"><MousePointer2 size={29} /></div><div className="mt-5 text-xs font-black uppercase tracking-[.16em] text-coral">Bước 2</div><h2 className="mt-2 font-display text-3xl font-extrabold text-forest">Chọn một hàng từ khóa</h2><p className="mx-auto mt-3 max-w-sm leading-7 text-ink/60">Bạn xung phong chọn một trong các hàng chưa mở ở bảng bên trái. Phần quà đang treo: <strong className="text-coral">{reward?.label}</strong>.</p></div></div> : <QuestionPanel row={puzzle.rows[active]} selected={selected} onSelect={setSelected} onContinue={finish} onSkip={() => finish(false)} reward={reward} />}
        </section>
      </div>
    </main>
  )
}

export default Game
