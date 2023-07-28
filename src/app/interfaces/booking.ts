export interface Booking{
    reserveId: number,
    meetingRoomId: number,
    reserveDate: string,
    startTime: string,
    endTime: string,
    userId: string,
    meetingRoomName?: string
}
