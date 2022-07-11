let restaurants

export default class RestuarantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                "Error connection to MongoDB:" + e.message
            )
        }
    }
}

static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
} = {}) {
    let query
    if (filters) {
        if ("name" in filters) {
            query = { $text: { $search: filters["name"] } }
        } else if ("cuisine" in filters) {
            query = { cuisine: filters["cuisine"] } }
        } else if ("zipcode" in filters) {
            query = { "address.zipcode": { $eq: filters["zipcode!"] } }
        }
    }
}