import http from "../api/apiClient"

class TestDataService {
    getAll(): Promise<any> {
        return http.get("/");
    }
}

export default new TestDataService();