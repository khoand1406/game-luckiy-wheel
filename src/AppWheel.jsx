import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, Home, Maximize2, Play, RefreshCw, RotateCcw, Shuffle, Sparkles, UserRound, Users, X } from 'lucide-react'
import questions from './data/wheelQuestions.json'

const COLORS = ['#ef654f', '#e6aa38', '#2c6653', '#4776e6', '#8b5cf6', '#ec4899', '#0f9f8f', '#f27d42', '#729b46', '#3b82f6', '#a855f7', '#d94c67']
const LETTERS = ['A', 'B', 'C', 'D']

function normalizeNames(text) {
  return [...new Set(text.split(/[\n,;]+/).map((name) => name.trim()).filter(Boolean))]
}

function Brand() {
  return <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-white shadow-card"><RefreshCw size={21} /></div><div><div className="font-display text-lg font-extrabold leading-none text-forest">Chiếc nón Tri thức</div><div className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-moss/60">Chương 7 • MLN131</div></div></div>
}

function Landing({ onStart }) {
  const [names, setNames] = useState('')
  const [className, setClassName] = useState('')
  return (
    <main className="paper-grain min-h-screen bg-cream">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8"><Brand /><span className="rounded-full border border-forest/10 bg-white/70 px-4 py-2 text-xs font-bold text-moss">12 câu • 4 đáp án</span></header>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-7 md:grid-cols-[1.02fr_.98fr] md:px-8 md:pt-12">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-2 text-xs font-black uppercase tracking-[.14em] text-forest"><Sparkles size={14} className="text-gold" /> Quay một vòng • Mở một câu hỏi</div>
          <h1 className="font-display text-5xl font-extrabold leading-[.98] text-forest md:text-7xl">Chiếc nón<br /><span className="text-coral">Tri thức.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 md:text-lg">Phiên bản lớp học lấy cảm hứng từ “Chiếc nón kỳ diệu”. Mỗi lượt quay chọn ngẫu nhiên một câu trắc nghiệm chưa xuất hiện — không điểm số, chỉ có khám phá.</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {[['01', 'Bốc cá nhân', 'Ngẫu nhiên hoặc nhập tay'], ['02', 'Quay nón', '12 câu không lặp'], ['03', 'Chốt đáp án', 'Giải thích ngay trên màn hình']].map(([number, title, note]) => <div key={number} className="rounded-2xl border border-forest/10 bg-white/75 p-4"><div className="font-display text-2xl font-black text-coral">{number}</div><div className="mt-2 font-extrabold text-forest">{title}</div><div className="mt-1 text-xs leading-5 text-ink/50">{note}</div></div>)}
          </div>
        </div>
        <div className="rounded-[2rem] border border-forest/10 bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-moss/10 text-moss"><Users size={21} /></div><div><h2 className="font-display text-2xl font-bold text-forest">Chuẩn bị lượt chơi</h2><p className="text-sm text-ink/50">Danh sách sinh viên là tùy chọn</p></div></div>
          <label className="text-xs font-extrabold uppercase tracking-[.12em] text-moss" htmlFor="class-name">Tên lớp</label>
          <input id="class-name" value={className} onChange={(event) => setClassName(event.target.value)} placeholder="Ví dụ: MLN131 - Lớp A" className="mt-2 w-full rounded-2xl border-2 border-forest/10 bg-cream/50 px-4 py-3.5 font-semibold text-forest placeholder:text-forest/30" />
          <label className="mt-5 block text-xs font-extrabold uppercase tracking-[.12em] text-moss" htmlFor="student-names">Danh sách sinh viên</label>
          <textarea id="student-names" value={names} onChange={(event) => setNames(event.target.value)} placeholder={'Mỗi tên một dòng, ví dụ:\nNguyễn Minh An\nTrần Thùy Linh\nLê Hoàng Nam'} className="mt-2 min-h-36 w-full resize-none rounded-2xl border-2 border-forest/10 bg-cream/50 px-4 py-3.5 font-semibold leading-6 text-forest placeholder:text-forest/30" />
          <div className="mt-2 text-xs font-semibold text-moss/55">Đã nhận diện {normalizeNames(names).length} sinh viên</div>
          <button onClick={() => onStart({ names: normalizeNames(names), className: className.trim() })} className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-4 font-extrabold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-moss"><Play size={19} fill="currentColor" /> Vào trường quay <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button>
        </div>
      </section>
    </main>
  )
}

function Wheel({ rotation, spinning, used, onSpin, disabled }) {
  const gradient = `conic-gradient(${COLORS.map((color, index) => `${color} ${index * 30}deg ${(index + 1) * 30}deg`).join(',')})`
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute left-1/2 top-[-8px] z-20 -translate-x-1/2"><div className="h-0 w-0 border-x-[20px] border-t-[36px] border-x-transparent border-t-forest drop-shadow-lg" /></div>
      <div className="absolute inset-3 rounded-full bg-forest/15 blur-xl" />
      <div className="absolute inset-4 rounded-full border-[10px] border-white p-3 shadow-soft transition-transform duration-[2600ms] ease-[cubic-bezier(.12,.7,.08,1)]" style={{ transform: `rotate(${rotation}deg)`, background: gradient }}>
        <div className="relative h-full w-full rounded-full border-4 border-white/35">
          {questions.map((question, index) => {
            const angle = index * 30 + 15
            return <div key={question.id} className={`absolute left-1/2 top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-lg font-black text-white drop-shadow ${used.includes(index) ? 'opacity-25' : ''}`} style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-185px) rotate(${-angle}deg)` }}>{question.id}</div>
          })}
          <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[8px] border-white bg-forest text-center text-white shadow-soft"><div><RefreshCw className={`mx-auto ${spinning ? 'animate-spin' : ''}`} size={28} /><div className="mt-1 text-[10px] font-black uppercase tracking-widest">Chương 7</div></div></div>
        </div>
      </div>
      <button disabled={disabled || spinning} onClick={onSpin} className="absolute bottom-0 left-1/2 z-30 inline-flex -translate-x-1/2 translate-y-3 items-center gap-2 rounded-full bg-coral px-7 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-forest/35"><RefreshCw size={19} /> {spinning ? 'Đang quay...' : 'QUAY NÓN'}</button>
    </div>
  )
}

function QuestionCard({ question, participant, setParticipant, names, onRandomName, time, selected, onSelect, onReveal, onNext }) {
  const revealed = selected !== null
  const correct = selected === question.correct
  return (
    <section className="rounded-[2rem] border border-forest/10 bg-white shadow-soft">
      <div className="border-b border-forest/10 p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-cream p-2"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-moss"><UserRound size={18} /></div><input value={participant} onChange={(event) => setParticipant(event.target.value)} placeholder="Tên người trả lời..." className="min-w-0 flex-1 bg-transparent px-1 text-sm font-bold text-forest outline-none" />{names.length > 0 && <button onClick={onRandomName} className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-3 py-2 text-xs font-black text-forest"><Shuffle size={14} /> Bốc lại</button>}</div>
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 font-black ${time <= 10 && !revealed ? 'bg-coral/10 text-coral' : 'bg-moss/10 text-moss'}`}><Clock3 size={18} /> {time}s</div>
        </div>
        <div className="mt-5 text-xs font-black uppercase tracking-[.15em] text-coral">Câu {question.id} • {question.topic}</div>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-forest md:text-3xl">{question.question}</h2>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-2 md:p-7">
        {question.answers.map((answer, index) => {
          const isCorrect = revealed && index === question.correct
          const isWrong = revealed && selected === index && index !== question.correct
          return <button key={answer} disabled={revealed} onClick={() => onSelect(index)} className={`flex min-h-24 items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${isCorrect ? 'border-moss bg-moss/10' : isWrong ? 'border-coral bg-coral/10' : 'border-forest/10 bg-cream/40 hover:-translate-y-0.5 hover:border-gold'} disabled:cursor-default`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black ${isCorrect ? 'bg-moss text-white' : isWrong ? 'bg-coral text-white' : 'bg-white text-forest'}`}>{isCorrect ? <Check size={18} /> : isWrong ? <X size={18} /> : LETTERS[index]}</span><span className="pt-1 font-semibold leading-6 text-ink">{answer}</span></button>
        })}
      </div>
      {revealed ? <div className={`border-t p-5 md:p-7 ${correct ? 'border-moss/15 bg-moss/5' : 'border-coral/15 bg-coral/5'}`}><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><div className={`font-extrabold ${correct ? 'text-moss' : 'text-coral'}`}>{correct ? 'Chính xác!' : selected === 'timeout' ? 'Hết giờ — đây là đáp án.' : 'Chưa chính xác.'}</div><p className="mt-1 max-w-3xl text-sm leading-6 text-ink/70">{question.explanation}</p></div><button onClick={onNext} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3.5 font-extrabold text-white hover:bg-moss">Lượt quay tiếp theo <ArrowRight size={18} /></button></div></div> : time === 0 ? <div className="border-t border-coral/15 bg-coral/5 p-5 text-center"><button onClick={onReveal} className="rounded-2xl bg-coral px-5 py-3 font-extrabold text-white">Hết giờ • Hiện đáp án</button></div> : null}
    </section>
  )
}

function Game({ setup, onHome }) {
  const [used, setUsed] = useState([])
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [current, setCurrent] = useState(null)
  const [selected, setSelected] = useState(null)
  const [time, setTime] = useState(30)
  const [participant, setParticipant] = useState('')
  const [usedNames, setUsedNames] = useState([])
  const timeoutRef = useRef(null)
  const complete = used.length === questions.length && current === null

  useEffect(() => { if (current === null || selected !== null || time === 0) return undefined; const timer = window.setInterval(() => setTime((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer) }, [current, selected, time])
  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function randomName() { if (!setup.names.length) return; const remaining = setup.names.filter((name) => !usedNames.includes(name)); const pool = remaining.length ? remaining : setup.names; const name = pool[Math.floor(Math.random() * pool.length)]; setParticipant(name); setUsedNames((old) => remaining.length ? [...old, name] : [name]) }
  function spin() { const remaining = questions.map((_, index) => index).filter((index) => !used.includes(index)); if (!remaining.length || spinning) return; const chosen = remaining[Math.floor(Math.random() * remaining.length)]; const normalized = ((rotation % 360) + 360) % 360; const desired = (360 - (chosen * 30 + 15)) % 360; const alignment = (desired - normalized + 360) % 360; setRotation(rotation + 5 * 360 + alignment); setSpinning(true); randomName(); timeoutRef.current = window.setTimeout(() => { setCurrent(chosen); setUsed((old) => [...old, chosen]); setSelected(null); setTime(30); setSpinning(false) }, 2600) }
  function next() { setCurrent(null); setSelected(null); setTime(30) }
  function reset() { window.clearTimeout(timeoutRef.current); setUsed([]); setRotation(0); setSpinning(false); setCurrent(null); setSelected(null); setTime(30); setParticipant(''); setUsedNames([]) }

  return (
    <main className="paper-grain min-h-screen bg-cream pb-10">
      <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-8"><button onClick={onHome}><Brand /></button><div className="hidden text-center md:block"><div className="text-[10px] font-black uppercase tracking-[.18em] text-moss/50">Trường quay lớp học</div><div className="font-extrabold text-forest">{setup.className || 'Chương 7 • Vấn đề gia đình'}</div></div><div className="flex items-center gap-2"><span className="rounded-xl bg-white px-3 py-2 text-xs font-black text-moss">{used.length}/12 câu</span><button onClick={reset} title="Chơi lại" className="grid h-10 w-10 place-items-center rounded-xl border border-forest/10 bg-white text-moss hover:bg-forest hover:text-white"><RotateCcw size={17} /></button><button onClick={() => document.documentElement.requestFullscreen?.()} title="Toàn màn hình" className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-white hover:bg-moss"><Maximize2 size={17} /></button></div></header>
      <div className="mx-auto grid w-full max-w-[1500px] items-start gap-7 px-5 md:px-8 lg:grid-cols-[minmax(430px,.85fr)_minmax(0,1.15fr)]">
        <section className="rounded-[2.2rem] border border-forest/10 bg-white/65 p-4 shadow-soft md:p-6"><div className="mb-2 text-center"><div className="text-xs font-black uppercase tracking-[.16em] text-coral">Vòng quay câu hỏi</div><h1 className="mt-1 font-display text-3xl font-extrabold text-forest">Chiếc nón Tri thức</h1></div><Wheel rotation={rotation} spinning={spinning} used={used} onSpin={spin} disabled={current !== null || complete} /><div className="mt-7 flex flex-wrap justify-center gap-2">{questions.map((question, index) => <span key={question.id} className={`grid h-7 w-7 place-items-center rounded-lg text-[11px] font-black ${used.includes(index) ? 'bg-moss text-white' : 'bg-forest/8 text-forest/40'}`}>{question.id}</span>)}</div></section>
        <div>{current !== null ? <QuestionCard question={questions[current]} participant={participant} setParticipant={setParticipant} names={setup.names} onRandomName={randomName} time={time} selected={selected} onSelect={setSelected} onReveal={() => setSelected('timeout')} onNext={next} /> : complete ? <div className="rounded-[2rem] bg-forest p-8 text-center text-white shadow-soft md:p-12"><div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.5rem] bg-gold text-forest"><Sparkles size={38} /></div><div className="mt-6 text-xs font-black uppercase tracking-[.18em] text-gold">Đã hoàn thành 12 câu</div><h2 className="mt-2 font-display text-4xl font-extrabold">Khép lại vòng quay</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-white/65">Cả lớp đã đi qua các nội dung trọng tâm về khái niệm, vị trí, chức năng, hôn nhân tiến bộ và xây dựng gia đình Việt Nam.</p><button onClick={reset} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-coral px-6 py-4 font-extrabold text-white"><RotateCcw size={18} /> Chơi lại từ đầu</button></div> : <div className="rounded-[2rem] border border-dashed border-forest/20 bg-white/60 p-8 text-center shadow-soft md:p-12"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gold/15 text-gold"><RefreshCw size={29} /></div><h2 className="mt-5 font-display text-3xl font-bold text-forest">Sẵn sàng cho lượt quay</h2><p className="mx-auto mt-3 max-w-lg leading-7 text-ink/55">Host bấm <strong>QUAY NÓN</strong>. Một câu chưa xuất hiện sẽ được chọn ngẫu nhiên, cùng một sinh viên nếu đã nhập danh sách.</p>{setup.names.length > 0 && <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-cream px-4 py-3 text-sm font-bold text-moss">Danh sách có {setup.names.length} sinh viên</div>}</div>}</div>
      </div>
    </main>
  )
}

export default function AppWheel() {
  const [setup, setSetup] = useState(null)
  const key = useMemo(() => setup ? `${setup.className}-${setup.names.join('|')}` : 'landing', [setup])
  return setup ? <Game key={key} setup={setup} onHome={() => setSetup(null)} /> : <Landing onStart={setSetup} />
}
