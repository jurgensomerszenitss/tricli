import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { formatPhoneNumber, toWeekMinutes } from '@/app/lib/maps'

describe('toWeekMinutes', () => {
    it('converts to week minutes', () => {
        const actual = toWeekMinutes(2, "10:00")
        expect(actual).toBe(3480)
    })
    it('converts to week minutes when null', () => {
        const actual = toWeekMinutes(2, null)
        expect(actual).toBe(2880)
    })
    it('converts to week minutes when undefined', () => {
        const actual = toWeekMinutes(2, undefined)
        expect(actual).toBe(2880)
    })
    it('converts to week minutes when empty', () => {
        const actual = toWeekMinutes(2, "")
        expect(actual).toBe(2880)
    })
}) 

describe('formatPhoneNumber', () => {
    it('format to phone format from only numbers', () => {
        const actual = formatPhoneNumber("12345678912")
        expect(actual).toBe("+1 (234) 567-89-12")
    })
    it('format to phone format when already correct', () => { 
        const actual = formatPhoneNumber("+1 (234) 567-59-12")
        expect(actual).toBe("+1 (234) 567-59-12")
    })
    it('format to phone format when null', () => { 
        const actual = formatPhoneNumber(null)
        expect(actual).toBe(null)
    })
    it('format to phone format when undefined', () => { 
        const actual = formatPhoneNumber(undefined)
        expect(actual).toBe(null)
    })
})