const apiAdapter = require('../../apiAdapter')

const { URL_SERVICE_COURSE, HOSTNAME } = process.env
const api = apiAdapter(URL_SERVICE_COURSE)

module.exports = async (req, res) => {
    try {
        const course = await api.get('/api/courses', {
            params:{
                ...req.query,
                status: 'published'
            }
        })

        // get all data from service courses
        const dataCourses = course.data

        // ambil first page dan last page dari data dari service courses
        const firstPage = dataCourses.data.first_page_url.split('?').pop()
        const lastPage = dataCourses.data.last_page_url.split('?').pop()

        // inject data
        dataCourses.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`
        dataCourses.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`

        // ambil prev dan next page url, ubah ke host API Gateway
        if(dataCourses.data.next_page_url) {
            const nextPage = dataCourses.data.next_page_courses.split('?').pop()
            dataCourses.data.next_page_courses = `${HOSTNAME}/courses?${nextPage}`
        }

        if(dataCourses.data.prev_page_url) {
            const prevPage = dataCourses.data.prev_page_url.split('?').pop()
            dataCourses.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`
        }

        // ubah url path courses
        dataCourses.data.path = `${HOSTNAME}/courses`

        return res.json(dataCourses)
    } catch (error) {

        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service unavailable'
            })
        }

        const {status, data} = error.response
        return res.status(status).json(data)
    }
}