import { useState } from 'react'

export function usePlatformState({ roleCards, initialQuestions, expertApplications, sampleThread, archiveEntries, userAccounts, moderationQueue }) {
  const [activeRole, setActiveRole] = useState('operator')
  const [archiveView, setArchiveView] = useState('table')
  const [questionView, setQuestionView] = useState('table')
  const [archiveSearch, setArchiveSearch] = useState('')
  const [archiveCategory, setArchiveCategory] = useState('All')
  const [questions, setQuestions] = useState(initialQuestions)
  const [applicationStatuses, setApplicationStatuses] = useState(Object.fromEntries(expertApplications.map((item) => [item.name, item.status])))
  const [acceptedAnswerId, setAcceptedAnswerId] = useState(sampleThread.answers[0].id)
  const [escalationHours, setEscalationHours] = useState(24)
  const [upvoteCounts, setUpvoteCounts] = useState(Object.fromEntries(archiveEntries.map((item) => [item.id, item.votes])))
  const [expertAnswer, setExpertAnswer] = useState('')
  const [answerNotice, setAnswerNotice] = useState('')
  const [applicationNotice, setApplicationNotice] = useState('')
  const [accountStatuses, setAccountStatuses] = useState(Object.fromEntries(userAccounts.map((item) => [item.name, item.status])))
  const [moderationItems, setModerationItems] = useState(moderationQueue)
  const [questionForm, setQuestionForm] = useState({ title: 'Storewide checkout error on mobile devices', tried: 'Cleared cache, switched theme section, and confirmed payment gateway status.', category: 'Checkout', details: 'The checkout button becomes unresponsive after users select shipping. It only happens on phones.' })

  const selectedRole = roleCards.find((role) => role.id === activeRole)
  const reviewedApplications = expertApplications.map((item) => ({ ...item, status: applicationStatuses[item.name] }))
  const threadAnswers = sampleThread.answers.map((answer) => ({ ...answer, accepted: acceptedAnswerId === answer.id }))
  const filteredArchive = archiveEntries.filter((entry) => (entry.title + entry.answer + entry.expert).toLowerCase().includes(archiveSearch.toLowerCase()) && (archiveCategory === 'All' || entry.category === archiveCategory))

  const handleFormSubmit = (event) => { event.preventDefault(); setQuestions((items) => [{ id: `Q-${Math.floor(2000 + Math.random() * 7000)}`, title: questionForm.title, category: questionForm.category, status: 'Awaiting expert', age: 'Just now', urgency: 'High', responses: 0, escalated: false }, ...items]); setQuestionForm((form) => ({ ...form, title: '', tried: '', details: '' })) }
  const handleUpvote = (id) => setUpvoteCounts((counts) => ({ ...counts, [id]: counts[id] + 1 }))
  const handleAcceptSolution = (id) => { setAcceptedAnswerId(id); setQuestions((items) => items.map((item, index) => index === 0 ? { ...item, status: 'Resolved', responses: Math.max(item.responses, sampleThread.answers.length), escalated: false } : item)) }
  const handleReviewApplication = (name, status) => setApplicationStatuses((items) => ({ ...items, [name]: status }))
  const handleExpertAnswer = (event) => { event.preventDefault(); if (!expertAnswer.trim()) return; setAnswerNotice('Answer posted. You earned 20 base points and the operator was notified.'); setExpertAnswer(''); setQuestions((items) => items.map((item, index) => index === 0 ? { ...item, responses: item.responses + 1, status: 'In review' } : item)) }
  const handleExpertApplication = (event) => { event.preventDefault(); setApplicationNotice('Application submitted for admin review. We will notify you when a decision is made.'); event.currentTarget.reset() }
  const toggleAccount = (name) => setAccountStatuses((items) => ({ ...items, [name]: items[name] === 'Suspended' ? 'Active' : 'Suspended' }))
  const resolveModerationItem = (id) => setModerationItems((items) => items.filter((item) => item.id !== id))

  return { activeRole, setActiveRole, archiveView, setArchiveView, questionView, setQuestionView, archiveSearch, setArchiveSearch, archiveCategory, setArchiveCategory, questions, escalationHours, setEscalationHours, upvoteCounts, expertAnswer, setExpertAnswer, answerNotice, applicationNotice, accountStatuses, moderationItems, questionForm, setQuestionForm, selectedRole, reviewedApplications, threadAnswers, filteredArchive, handleFormSubmit, handleUpvote, handleAcceptSolution, handleReviewApplication, handleExpertAnswer, handleExpertApplication, toggleAccount, resolveModerationItem }
}
