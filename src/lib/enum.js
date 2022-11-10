/**
 * Hàm dùng toàn chương trình
 * Author: Tuan
 * Date: 7/11/2022
 */
export default {
    FormMode: {
        Add: 1,
        Edit: 2,
        Delete: 3,
        Duplicate: 4,
        Deletes: 5,

    },
    StatusCode:{
        OK:200, //Cho biết request đã thành công
        CREATED:201, //Tạo dữ liệu thành công. Sử dụng RIÊNG cho phương thức POST
        BADREQUEST:400, //Server xử lý request gặp lỗi
        UNAUTHORIZED:401, //Hệ thống chưa được ủy quyền. 
        FORBIDDEN:403, //Client không có quyền truy cập tài nguyên này
        NOTFOUND:404, //Server không tìm thấy bất kì tài nguyên nào liên quan tới request URL này
        NTERNALSERVERERROR:500, //Có lỗi xảy ra phía máy chủ. Ví dụ: Server quá tải CPU, RAM → Bị down
    }

}
