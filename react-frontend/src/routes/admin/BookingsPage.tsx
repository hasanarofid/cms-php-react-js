import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock, User } from 'lucide-react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { apiClient } from '../../lib/api-client'
import { useFlashMessage } from '../../hooks/useFlashMessage'
import { FlashMessage } from '../../components/admin/FlashMessage'

export default function BookingsPage() {
  const { flashMessage, showMessage } = useFlashMessage()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  async function loadBookings() {
    try {
      const data = await apiClient.get('/admin/bookings')
      setBookings(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await apiClient.post(`/admin/bookings/${id}/status`, { status })
      showMessage('Status booking berhasil diperbarui', 'success')
      loadBookings()
    } catch (error) {
      showMessage('Gagal memperbarui status', 'error')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked_in':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">In House</span>
      case 'checked_out':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">Checked Out</span>
      case 'booked':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Booked</span>
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Cancelled</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">{status}</span>
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="w-full p-4">
        <div className="max-w-7xl mx-auto">
          {flashMessage.show && (
            <FlashMessage
              message={flashMessage.message}
              type={flashMessage.type}
              onClose={() => {}}
            />
          )}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Resepsionis - Check In/Out</h1>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamu & Kamar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In - Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada data booking</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="text-gray-500" size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                            <div className="text-sm text-gray-500">{booking.roomName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.checkIn).toLocaleDateString('id-ID')} - {new Date(booking.checkOut).toLocaleDateString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {booking.status === 'booked' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'checked_in')}
                              className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                              title="Check In"
                            >
                              <Clock size={18} />
                              <span>Check In</span>
                            </button>
                          )}
                          {booking.status === 'checked_in' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'checked_out')}
                              className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                              title="Check Out"
                            >
                              <CheckCircle size={18} />
                              <span>Check Out</span>
                            </button>
                          )}
                          {(booking.status === 'booked') && (
                            <button
                              onClick={() => updateStatus(booking.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                              title="Batalkan"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

