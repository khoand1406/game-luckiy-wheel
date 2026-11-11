import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Eye, HelpCircle, Home, Lightbulb, Maximize2, Play, RotateCcw, Shuffle, Sparkles, UserRound, Users, X } from 'lucide-react'
import gameData from './data/classGame.json'

const rows = gameData.crossword.rows
const palette = ['bg-coral', 'bg-gold', 'bg-moss', 'bg-sky-600', 'bg-violet-600', 'bg-rose-500', 'bg-teal-600']

function normalizeNames(text) {
  return [...new Set(text.split(/[\n,;]+/).map((name) => name.trim()).filter(Boolean))]
}

function Brand() {
  return <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-white shadow-card"><Home size={21} /></div><div><div className="font-display text-lg font-extrabold leading-none text-forest">Ô chữ Tổ ấm</div><div className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-moss/60">Chương 7 • MLN131</div></div></div>
}

function Landing({ onStart }) {
  const [names, setNames] = useState('')
  const [className, setClassName] = useState('')
  return (
    <main className="paper-grain min-h-screen overflow-hidden bg-cream">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8"><Brand /><span className="rounded-full border border-forest/10 bg-white/70 px-4 py-2 text-xs font-bold text-moss">Dành cho lớp học</span></header>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-7 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pt-12">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-2 text-xs font-black uppercase tracking-[.14em] text-forest"><Sparkles size={14} className="text-gold" /> Một người trả lời • Cả lớp cùng suy luận</div>
          <h1 className="font-display text-5xl font-extrabold leading-[.98] text-forest md:text-7xl">Giải ô chữ,<br /><span className="text-coral">mở mật mã.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 md:text-lg">Bảy hàng ngang, một từ khóa bí mật. Host bốc tên sinh viên, mở gợi ý và điều khiển từng lượt — không điểm số, không áp lực.</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {[['01', 'Bốc tên', 'Ngẫu nhiên hoặc nhập tay'], ['02', '45 giây', 'Có thể mở gợi ý'], ['03', 'Chốt bài', 'Giải thích sau mỗi từ']].map(([number, title, note]) => <div key={number} className="rounded-2xl border border-forest/10 bg-white/70 p-4"><div className="font-display text-2xl font-black text-coral">{number}</div><div className="mt-2 font-extrabold text-forest">{title}</div><div className="mt-1 text-xs leading-5 text-ink/50">{note}</div></div>)}
          </div>
        </div>
        <div className="rounded-[2rem] border border-forest/10 bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-moss/10 text-moss"><Users size={21} /></div><div><h2 className="font-display text-2xl font-bold text-forest">Chuẩn bị lớp</h2><p className="text-sm text-ink/50">Danh sách là tùy chọn</p></div></div>
          <label className="text-xs font-extrabold uppercase tracking-[.12em] text-moss" htmlFor="class-name">Tên lớp</label>
          <input id="class-name" value={className} onChange={(event) => setClassName(event.target.value)} placeholder="Ví dụ: MLN131 - Nhóm 3" className="mt-2 w-full rounded-2xl border-2 border-forest/10 bg-cream/50 px-4 py-3.5 font-semibold text-forest placeholder:text-forest/30" />
          <label className="mt-5 block text-xs font-extrabold uppercase tracking-[.12em] text-moss" htmlFor="student-names">Tên sinh viên</label>
          <textarea id="student-names" value={names} onChange={(event) => setNames(event.target.value)} placeholder={'Mỗi tên một dòng, ví dụ:\nNguyễn Minh An\nTrần Thùy Linh\nLê Hoàng Nam'} className="mt-2 min-h-36 w-full resize-none rounded-2xl border-2 border-forest/10 bg-cream/50 px-4 py-3.5 font-semibold leading-6 text-forest placeholder:text-forest/30" />
          <div className="mt-2 text-xs font-semibold text-moss/55">Đã nhận diện {normalizeNames(names).length} sinh viên</div>
          <button onClick={() => onStart({ names: normalizeNames(names), className: className.trim() })} className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-4 font-extrabold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-moss"><Play size={19} fill="currentColor" /> Mở bảng ô chữ <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button>
        </div>
      </section>
    </main>
  )
}

function CrosswordRow({ row, index, solved, hints, solver, active, onClick }) {
  return (
    <button aria-label={`Hàng ${index + 1}${solved ? `, đáp án ${row.answer}` : ', chọn câu'}`} onClick={onClick} className={`group w-full rounded-2xl border-2 p-3 text-left transition ${active ? 'border-gold bg-gold/10 shadow-card' : solved ? 'border-moss/30 bg-moss/5' : 'border-forest/10 bg-white hover:-translate-y-0.5 hover:border-coral/40'}`}>
      <div className="flex items-center gap-3"><div className={`${palette[index]} grid h-10 w-10 shrink-0 place-items-center rounded-xl font-black text-white`}>{index + 1}</div><div className="flex min-w-0 flex-1 flex-wrap gap-1 sm:gap-1.5">
        {[...row.cells].map((letter, letterIndex) => { const visible = solved || hints.includes(letterIndex); const keyCell = letterIndex === row.keyIndex; return <span key={letterIndex} className={`grid h-8 w-7 place-items-center rounded-md border-b-2 text-sm font-black sm:h-10 sm:w-8 sm:text-base ${keyCell ? 'border-coral bg-coral/10 text-coral' : 'border-forest/20 bg-cream/70 text-forest'}`}>{visible ? letter : ''}</span> })}
      </div><div className="hidden shrink-0 text-right md:block">{solved ? <><div className="flex items-center justify-end gap-1 text-xs font-black text-moss"><Check size={14} /> Đã mở</div>{solver && <div className="mt-1 max-w-28 truncate text-xs text-ink/45">{solver}</div>}</> : <div className="text-xs font-bold text-ink/35">Chọn câu</div>}</div></div>
    </button>
  )
}

function SecretKeyword({ solved }) {
  const complete = solved.every(Boolean)
  return <div className={`rounded-[2rem] p-5 text-white shadow-soft transition md:p-6 ${complete ? 'bg-coral' : 'bg-forest'}`}><div className="flex items-center justify-between"><div><div className="text-[10px] font-black uppercase tracking-[.18em] text-white/55">Từ khóa dọc</div><div className="mt-1 font-display text-xl font-bold">Mật mã cuối cùng</div></div><Sparkles className={complete ? 'text-white' : 'text-gold'} /></div><div className="mt-5 flex justify-center gap-1.5">{[...gameData.crossword.keyword].map((letter, index) => <div key={index} className={`grid h-11 w-9 place-items-center rounded-xl text-xl font-black sm:h-12 sm:w-10 ${solved[index] ? 'bg-white text-forest' : 'bg-white/10 text-white/20'}`}>{solved[index] ? letter : '?'}</div>)}</div><p className="mt-4 text-center text-xs leading-5 text-white/55">{complete ? 'Đã giải mã: GIA ĐÌNH' : `${solved.filter(Boolean).length}/7 chữ cái đã xuất hiện`}</p></div>
}

function ControlPanel({ row, rowIndex, time, participant, onParticipant, names, onRandom, onHint, canHint, onSolve, onClose, solved }) {
  return (
    <aside className="rounded-[2rem] border border-forest/10 bg-white p-5 shadow-soft md:p-6">
      <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[.15em] text-coral">Hàng ngang {rowIndex + 1}</div><h2 className="mt-1 font-display text-2xl font-bold text-forest">Câu hỏi cho cá nhân</h2></div><button onClick={onClose} aria-label="Đóng câu hỏi" className="grid h-9 w-9 place-items-center rounded-xl bg-cream text-moss hover:bg-forest hover:text-white"><X size={17} /></button></div>
      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-cream p-2"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-moss"><UserRound size={18} /></div><input value={participant} onChange={(event) => onParticipant(event.target.value)} placeholder="Tên người đang trả lời..." className="min-w-0 flex-1 bg-transparent px-2 text-sm font-bold text-forest outline-none" />{names.length > 0 && <button onClick={onRandom} className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-3 py-2 text-xs font-black text-forest"><Shuffle size={14} /> Bốc tên</button>}</div>
      <div className={`mt-5 flex items-center justify-between rounded-2xl px-4 py-3 ${time <= 10 && !solved ? 'bg-coral/10 text-coral' : 'bg-moss/10 text-moss'}`}><div className="flex items-center gap-2 font-black"><Clock3 size={19} /> Thời gian suy nghĩ</div><div className="font-display text-3xl font-black">{time}s</div></div>
      <div className="mt-5 rounded-2xl border border-forest/10 bg-cream/50 p-5"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-moss"><HelpCircle size={15} /> Gợi ý</div><p className="mt-3 text-base font-semibold leading-7 text-ink">{row.clue}</p></div>
      {solved && <div className="mt-4 rounded-2xl bg-moss/10 p-4"><div className="text-xs font-black uppercase tracking-[.12em] text-moss">Chốt kiến thức</div><p className="mt-2 text-sm leading-6 text-ink/70">{row.explain}</p></div>}
      <div className="mt-5 grid grid-cols-2 gap-2">{!solved ? <><button disabled={!canHint} onClick={onHint} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-gold bg-gold/10 px-3 py-3.5 text-sm font-extrabold text-forest disabled:cursor-not-allowed disabled:opacity-40"><Lightbulb size={17} /> Mở 1 chữ</button><button onClick={onSolve} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-forest/10 px-3 py-3.5 text-sm font-extrabold text-moss hover:border-moss"><Eye size={17} /> Hiện đáp án</button><button onClick={onSolve} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-moss px-4 py-4 font-extrabold text-white shadow-card hover:bg-forest"><Check size={19} /> Trả lời chính xác</button></> : <button onClick={onClose} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-4 font-extrabold text-white"><ArrowLeft size={18} /> Trở lại bảng ô chữ</button>}</div>
    </aside>
  )
}

function Game({ setup, onHome }) {
  const [active, setActive] = useState(null)
  const [solved, setSolved] = useState(() => rows.map(() => false))
  const [hints, setHints] = useState(() => rows.map(() => []))
  const [solvers, setSolvers] = useState(() => rows.map(() => ''))
  const [participant, setParticipant] = useState('')
  const [time, setTime] = useState(45)
  const [usedNames, setUsedNames] = useState([])
  const [showFinish, setShowFinish] = useState(false)
  const activeRow = active === null ? null : rows[active]
  const complete = solved.every(Boolean)

  useEffect(() => { if (active === null || solved[active] || time === 0) return undefined; const timer = window.setInterval(() => setTime((current) => Math.max(0, current - 1)), 1000); return () => window.clearInterval(timer) }, [active, solved, time])
  useEffect(() => { if (complete) setShowFinish(true) }, [complete])

  function randomName() { if (setup.names.length === 0) return; const remaining = setup.names.filter((name) => !usedNames.includes(name)); const pool = remaining.length > 0 ? remaining : setup.names; const next = pool[Math.floor(Math.random() * pool.length)]; setParticipant(next); setUsedNames((current) => remaining.length > 0 ? [...current, next] : [next]) }
  function selectRow(index) { setActive(index); setTime(45); if (!solved[index] && setup.names.length > 0) randomName() }
  function openHint() { if (active === null) return; const row = rows[active]; const available = [...row.cells].map((_, index) => index).filter((index) => index !== row.keyIndex && !hints[active].includes(index)); if (available.length === 0) return; const letterIndex = available[Math.floor(Math.random() * available.length)]; setHints((current) => current.map((item, index) => index === active ? [...item, letterIndex] : item)) }
  function solveActive() { if (active === null) return; setSolved((current) => current.map((value, index) => index === active ? true : value)); setSolvers((current) => current.map((value, index) => index === active ? participant.trim() : value)) }
  function resetBoard() { setSolved(rows.map(() => false)); setHints(rows.map(() => [])); setSolvers(rows.map(() => '')); setActive(null); setTime(45); setParticipant(''); setUsedNames([]); setShowFinish(false) }

  return (
    <main className="paper-grain min-h-screen bg-cream pb-10">
      <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-8"><button onClick={onHome}><Brand /></button><div className="hidden text-center md:block"><div className="text-[10px] font-black uppercase tracking-[.18em] text-moss/50">Phiên lớp học</div><div className="font-extrabold text-forest">{setup.className || 'Chương 7 • Vấn đề gia đình'}</div></div><div className="flex gap-2"><button onClick={resetBoard} title="Làm mới bảng" className="grid h-10 w-10 place-items-center rounded-xl border border-forest/10 bg-white text-moss hover:bg-forest hover:text-white"><RotateCcw size={17} /></button><button onClick={() => document.documentElement.requestFullscreen?.()} title="Toàn màn hình" className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-white hover:bg-moss"><Maximize2 size={17} /></button></div></header>
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-5 md:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,.55fr)]">
        <section><div className="mb-4 flex items-end justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[.16em] text-coral">7 hàng ngang • 1 từ khóa</div><h1 className="mt-1 font-display text-3xl font-extrabold text-forest md:text-4xl">{gameData.crossword.title}</h1></div><div className="text-right text-xs font-bold text-moss/60">Nhấn vào một hàng<br />để mở câu hỏi</div></div><div className="space-y-2.5">{rows.map((row, index) => <CrosswordRow key={row.id} row={row} index={index} solved={solved[index]} hints={hints[index]} solver={solvers[index]} active={active === index} onClick={() => selectRow(index)} />)}</div></section>
        <div className="space-y-5"><SecretKeyword solved={solved} />{activeRow ? <ControlPanel row={activeRow} rowIndex={active} time={time} participant={participant} onParticipant={setParticipant} names={setup.names} onRandom={randomName} onHint={openHint} canHint={hints[active].length < activeRow.cells.length - 1} onSolve={solveActive} onClose={() => setActive(null)} solved={solved[active]} /> : <div className="rounded-[2rem] border border-dashed border-forest/20 bg-white/60 p-8 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold"><BookOpen size={25} /></div><h2 className="mt-4 font-display text-2xl font-bold text-forest">Sẵn sàng mở câu</h2><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-ink/55">Chọn một hàng ngang. Host có thể bốc tên, mở chữ gợi ý và xác nhận đáp án.</p>{setup.names.length > 0 && <div className="mt-5 rounded-2xl bg-cream px-4 py-3 text-sm font-bold text-moss">{setup.names.length} sinh viên trong danh sách</div>}</div>}</div>
      </div>
      {showFinish && <div className="fixed inset-0 z-50 grid place-items-center bg-forest/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-lg animate-pop rounded-[2rem] bg-white p-7 text-center shadow-soft md:p-10"><div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.5rem] bg-coral text-white"><Sparkles size={38} /></div><div className="mt-6 text-xs font-black uppercase tracking-[.18em] text-coral">Mật mã đã mở</div><h2 className="mt-2 font-display text-5xl font-extrabold text-forest">GIA ĐÌNH</h2><p className="mt-4 leading-7 text-ink/65">Gia đình là một hình thức cộng đồng xã hội đặc biệt, là tế bào của xã hội, tổ ấm của mỗi người và cầu nối giữa cá nhân với xã hội.</p><button onClick={() => setShowFinish(false)} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-forest px-6 py-4 font-extrabold text-white hover:bg-moss"><Check size={18} /> Hoàn thành</button></div></div>}
    </main>
  )
}

export default function AppClassroom() {
  const [setup, setSetup] = useState(null)
  const gameKey = useMemo(() => setup ? `${setup.className}-${setup.names.join('|')}` : 'landing', [setup])
  return setup ? <Game key={gameKey} setup={setup} onHome={() => setSetup(null)} /> : <Landing onStart={setSetup} />
}
