/* Hàm dùng toàn chương trình
    Author: Tuan
    Date: 7/11/2022
 */
export default {
    Url:{
        FixedAssets:"http://localhost:28533/api/v1/FixedAssets",
        Departments:"http://localhost:28533/api/v1/Departments",
        FixedAssetCategories:"http://localhost:28533/api/v1/FixedAssetCategories",
    },

    // Các thông báo exception gửi về từ backend hiện ra cho người dùng
    ExceptionMsg:{
        BADREQUEST: "Dữ liệu đầu vào không hợp lệ.", 
        UNAUTHORIZED: "Hệ thống MISA chưa được ủy quyền.",
        FORBIDDEN: "Không có quyền truy cập tài nguyên này.",
        NOTFOUND:"Server không tìm thấy bất kì tài nguyên nào.", 
        NTERNALSERVERERROR:"Có lỗi xảy ra phía máy chủ. Vui lòng liên hệ MISA!.", 
    },

    // Các thông báo nếu nhập thiếu
    IsEmpty: {
        code: "Cần phải nhập thông tin Mã tài sản.",
        name: "Cần phải nhập thông tin Tên tài sản.",
        department: "Cần phải nhập thông tin Mã bộ phận sử dụng.",
        category: "Cần phải nhập thông tin Mã loại tài sản.",
        quantity: "Cần phải nhập thông tin Số lượng.",
        cost: "Cần phải nhập thông tin Nguyên giá.",
        depreciation_rate: "Cần phải nhập thông tin Tỉ lệ hao mòn.",
        purchase_date: "Cần phải nhập thông tin Ngày mua.",
        production_date: "Cần phải nhập thông tin Ngày bắt đầu sử dụng.",
        life_time: "Cần phải nhập thông tin Số năm sử dụng.",
        depreciation_year: "Cần phải nhập thông tin Giá trị hao mòn năm.",
    },

    // Error Message
    ErrorMsg: {
        DepreciationRateEqualToOneDevideLifeTime: "Tỉ lệ hao mòn phải bằng 1/Số năm sử dụng.", // Mã lỗi tỷ lệ hao mòn 
        DepreciationYearLessThanOrEqualToCost: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá.", // Mã lỗi hao mòn năm nhỏ hơn hoặc bằng nguyên giá
        CloseMsg: "Bạn có muốn hủy bỏ khai báo tài sản này?.", // Lời nhắn khi đóng
        CloseEditedMsg: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?.", // Lời nhắn khi đóng mà trước đó đã sửa đổi
        ValidateEmpty: "Cần phải nhập thông tin: .", // Lời nhắn khi nhập thiếu
        ValidateDuplicateCode: "Mã tài sản đã tồn tại.", // Lời nhắn khi trùng mã tài sản
    },
        
    TitleModal: {
        Insert: "Thêm tài sản",
        Update: "Sửa tài sản",
        Replication: "Nhân bản tài sản",
    },

    TitleFunction: {
        Insert: "Thêm tài sản",
        Export: "Xuất khẩu tài sản",
        Delete: "Xoá tài sản",
        CategoryFilter: "Loại tài sản",
        DepartmentFilter: "Bộ phận sử dụng",
        Search: "Tìm kiếm tài sản"
    },

    TextVi:{
        Modal:{
            FixedAssetCode: "Mã tài sản",
            FixedAssetName: "Tên tài sản",
            DepartmentCode: "Mã bộ phận sử dụng",
            DepartmentName: "Tên bộ phận sử dụng",
            FixedAssetCategoryCode: "Mã loại tài sản",
            FixedAssetCategoryName: "Tên loại tài sản",
            Quantity: "Số lượng",
            Cost: "Nguyên giá",
            DepreciationRate: "Tỷ lệ hao mòn (%)",
            PurchaseDate: "Ngày mua",
            ProductionDate: "Ngày bắt đầu sử dụng",
            TrackedYear: "Năm theo dõi",
            LifeTime: "Số năm sử dụng",
            DepreciationYear: "Giá trị hao mòn năm",
        },
    }
}
