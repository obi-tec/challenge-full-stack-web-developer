import apiClient from '../utils/apiClient'

export interface User {
  uuid: string
  email: string
  name: string
}

export interface UpdateUserDTO {
  email: string
  name: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  currentPage: number
  perPage: number
  totalPages: number
}

export const userRepository = {
  async fetchUsers(currentPage = 1, perPage = 10): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get('/users', {
      params: { currentPage, perPage },
    })
    return {
      data: response.data.users,
      total: response.data.total,
      currentPage: response.data.currentPage,
      perPage: response.data.perPage,
      totalPages: response.data.totalPages,
    }
  },

  async createUser(user: User): Promise<User> {
    const response = await apiClient.post('/users', user)
    return response.data
  },

  async updateUser(uuid: string, user: UpdateUserDTO): Promise<User> {
    const response = await apiClient.put(`/users/${uuid}`, user)
    return response.data
  },

  async deleteUser(uuid: string): Promise<void> {
    await apiClient.delete(`/users/${uuid}`)
  },
}
