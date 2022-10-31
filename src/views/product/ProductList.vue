<template>
    <div class="content" >
        <!-- BEGIN: Content/Function -->
        <div class="function">
            <div class="function__list">
                <!-- BEGIN: Tìm kiếm tài sản -->
                <div class="function__item function__item--maright  function__item--search">
                    <div class="function__icon"> 
                        <i class="icon icon--search"></i>
                    </div>
                    
                    <input class="input input--search" type="text" placeholder="Tìm kiếm tài sản">
                </div>
                <!-- END: Tìm kiếm tài sản -->

                <!-- BEGIN: Lọc loại tài sản -->
                <div class="function__item function__item--maright function__item--loaitaisan" @click="this.category.show = !this.category.show">
                    <div class="function__icon"> 
                        <i class="icon icon--filter"></i>
                    </div>

                    <input class="input input--filter" type="text" :value="this.category.value" tabindex="0" v-on:keyup.enter="this.category.show = !this.category.show" readonly>

                    <div class="function__icon--dropdown"> 
                        <i class="icon icon--dropdown"></i>
                    </div>

                    <div class="drilldown drilldown__normal" v-show="this.category.show">
                        <ul class="drilldown__box" >
                            <li 
                                class="drilldown__item" 
                                tabindex="0" 
                                :class="{'drilldown__item--selected': item == this.category.value}"
                                v-for='item in this.category.list'
                                @click="selectCategory(item)"
                                v-on:keyup.enter="selectCategory(item), this.category.show = false "
                                :key="item"
                                multiple
                            >
                                <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                                <div class="drilldown__name">{{item}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- END: Lọc loại tài sản -->

                <!-- BEGIN: Lọc bộ phận sử dụng -->
                <div class="function__item function__item--maright function__item--loaitaisan" @click="this.department.show = !this.department.show">
                    <div class="function__icon"> 
                        <i class="icon icon--filter"></i>
                    </div>

                    <div class="function__icon--dropdown"> 
                        <i class="icon icon--dropdown"></i>
                    </div>
                    
                    <input class="input input--filter" type="text" :value="this.department.value" tabindex="0" v-on:keyup.enter="this.department.show = !this.department.show" readonly>

                    <div class="drilldown drilldown__normal" v-show="this.department.show">
                        <ul class="drilldown__box" >
                            <li 
                                class="drilldown__item" 
                                tabindex="0" 
                                :class="{'drilldown__item--selected': item == this.department.value}"
                                v-for='item in this.department.list'
                                @click="selectDepartment(item)" 
                                v-on:keyup.enter="selectDepartment(item), this.department.show = false"
                                :key="item"
                                multiple
                            >
                                <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                                <div class="drilldown__name">{{item}}</div>
                            </li>
                        </ul>
                    </div>
                </div>  
                <!-- BEGIN: Lọc bộ phận sử dụng -->
            </div>

            <div class="function__list">
                <!-- BEGIN: Thêm tài sản -->
                <button class="btn btn__add function__item--maleft" @click="openModal()">+ Thêm tài sản</button>
                <!-- END: Thêm tài sản -->

                <!-- BEGIN: Xuất bảng tài sản -->
                <button class="btn btn__excel function__item--maleft" data-title="Xuất bảng tài sản">
                    <i class="icon icon--excel"></i>
                </button>    
                <!-- END: Xuất bảng tài sản -->

                <!-- BEGIN: Xoá tài sản -->
                <button class="btn btn__del function__item--maleft" data-title="Xoá tài sản">
                    <i class="icon icon--del"></i>
                </button>    
                <!-- END: Xoá tài sản -->
            </div>
        </div>
        <!-- END: Content/Function -->

        <!-- BEGIN: Content/Table -->  
        <div class="table">
            <table class="table__list">
                <!-- BEGIN: Table/Header -->
                <thead class="table__header">
                    <tr class="table__row table__row--head">
                        <th class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
<!--                             <i class="icon icon-checkbox"></i> -->
                        </th>
                        <th class="table__col table__col--center" data-title="Số thứ tự">STT</th>
                        <th class="table__col table__col--left">Mã tài sản</th>
                        <th class="table__col table__col--left">Tên tài sản</th>
                        <th class="table__col table__col--left">Loại tàn sản</th>
                        <th class="table__col table__col--left">Bộ phận sử dụng</th>
                        <th class="table__col table__col--right">Số lượng</th>
                        <th class="table__col table__col--right">Nguyên giá</th>
                        <th class="table__col table__col--right" data-title="Hao mòn/khấu hao luỹ kế">HM/KH luỹ kế</th>
                        <th class="table__col table__col--right">Giá trị còn lại</th>
                        <th class="table__col table__col--center">Chức năng</th>
                    </tr>
                </thead>
                <!-- END: Table/Header -->

                <!-- BEGIN: Table/Body -->
                <tbody class="table__body">
                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-open-modal" data-title="Sửa tài sản" @click="openModal()">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Nhân bản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr class="table__row table__row--body">
                        <td class="table__col table__col--check">
                            <input type="checkbox" v-model='isCheckAll'>
                        </td>
                        <td class="table__col table__col--center">1</td>
                        <td class="table__col table__col--left">TOIBT2131232</td>
                        <td class="table__col table__col--left">Lenovo IdeaPad L340</td>
                        <td class="table__col table__col--left">Máy vi tính xách tay</td>
                        <td class="table__col table__col--left">Phòng Hành Chính Sự Nghiệp</td>
                        <td class="table__col table__col--right">1</td>
                        <td class="table__col table__col--right">15.000.000</td>
                        <td class="table__col table__col--right">900.000</td>
                        <td class="table__col table__col--right">14.100.000</td>
                        <td class="table__col table__col--function  table__col--center">
                            <div class="table__function">
                                <div class="table__icon js-buy-ticket" data-title="Sửa tài sản">
                                    <i class="icon icon--edit"></i>
                                </div>
                                <div class="table__icon" data-title="Chi tiết tài sản">
                                    <i class="icon icon--detail"></i>
                                </div>
                            </div>
                        </td>
                    </tr>

                    

               
                
                </tbody>
                <!-- END: Table/Body -->
                
                <!-- BEGIN: Table/Footer -->
                <tbody class="table__footer">
                    <tr class=".table__row table__row--paging">
                        <td class="table__col" colspan="4">
                            <div class="table__pagination">
                                <div class="table__sum">Tổng số: <b>200 bản ghi</b></div>
                                <div class="table__size" data-title="Số bản ghi trong một dòng">
                                    20
                                    <i class="icon icon--dropdown"></i>
                                </div>
                                <div class="pagination__list">
                                    <div class="pagination__item pagination__item--icon">
                                        <i class="icon icon--pagingleft"></i>
                                    </div>
                                    <div class="pagination__item pagination__item--value">
                                        <div class="pagination__subitem">
                                            <p class=""><b>1</b></p>
                                        </div>
                                        <div class="pagination__subitem">
                                            <p class="">2</p>
                                        </div>
                                        <div class="pagination__subitem">
                                            <p class="">...</p>
                                        </div>
                                        <div class="pagination__subitem">
                                            <p class="">10</p>
                                        </div>
                                    </div>
                                    <div class="pagination__item pagination__item--icon">
                                        <i class="icon icon--pagingright"></i>
                                    </div>
                                </div>
                            </div>     
                        </td>
                        <th class="table__col table__col--left">

                        </th>
                        <th class="table__col table__col--left">

                        </th>
                        <th class="table__col table__col--right">
                            13
                        </th>
                        <th class="table__col table__col--right">
                            15.000.000
                        </th>
                        <th class="table__col table__col--right">
                            900.000
                        </th>
                        <th class="table__col table__col--right">
                            226.400.000
                        </th>
                        <th class="table__col table-col--center">
                            
                        </th>
                    </tr> 
                </tbody>
                <!-- END: Table/Footer -->
            </table>
        </div>
        <!-- END: Content/Table -->
    </div>

    <div class="modal" :class="{open: displayModal}">
        <form class="modal__main" @submit.prevent="onSubmit()">
            <!-- BEGIN: Close modal -->
            <div class="modal__section modal__close" @click="closeModal()">
                <i class="icon icon--close"></i>
            </div>
            <!-- END: Close modal -->

            <!-- BEGIN: Header modal -->
            <header class="modal__section modal__header">
                Thêm tài sản
            </header>
            <!-- END: Header modal -->

            <!-- BEGIN: Body modal -->
            <div class="modal__section modal__body">
                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-mataisan" class="modal__label">
                            Mã tài sản <em>*</em>
                        </label>
                        <input ref="focusMe" v-model.trim="taiSan.maTaiSan" class="input" type="text" placeholder="Nhập mã tài sản" style="">
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label for="enter-tentaisan" class="modal__label">
                            Tên tài sản <em>*</em>
                        </label>
                        <input
                            v-model.trim="taiSan.tenTaiSan" 
                            v-bind:class="{'input--error': this.checkTenTaiSan.hasError}" 
                            class="input" type="text"  
                            placeholder="Nhập tên tài sản">
                        <p class="input__text--error" v-if="this.checkTenTaiSan.hasError">Lỗi cú pháp</p>
                    </div>
                </div>
                
                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-mabophansudung" class="modal__label">
                            Mã bộ phận sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="taiSan.maBPSD"  
                                v-bind:class="{'input--error': this.checkMaBPSD.hasError}" 
                                class="input input--haveicon" type="text"  
                                placeholder="Chọn mã bộ phận sử dụng"
                            
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="modal__dropdown">
                                <div class="function__drilldown--box">
                                    <div class="function__drilldown--item function__drilldown--head">
                                        <div class="function__drilldown--id"><b>Mã</b></div>
                                        <div class="function__drilldown--name"><b>Tên bộ phận sử dụng</b></div>
                                </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0001</div>
                                        <div class="function__drilldown--name">Phòng hành chính sự nghiệp</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0002</div>
                                        <div class="function__drilldown--name">Phòng kế toán</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0003</div>
                                        <div class="function__drilldown--name">Bóng thư ký</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0004</div>
                                        <div class="function__drilldown--name">Máy lọc nước</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0005</div>
                                        <div class="function__drilldown--name">Bàn ghế các loại</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0006</div>
                                        <div class="function__drilldown--name">Máy điều hoà</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0007</div>
                                        <div class="function__drilldown--name">Máy tủ lạnh</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0008</div>
                                        <div class="function__drilldown--name">Máy chiếu</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">P0009</div>
                                        <div class="function__drilldown--name">Tivi tinh thể lỏng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkMaBPSD.hasError">Lỗi cú pháp</p>
                     

                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label for="enter-tenbophansudung" class="modal__label">
                            Tên bộ phận sử dụng
                        </label>
                        <input v-model.trim="taiSan.tenBPSD"  class="input input--disable" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-maloaitaisan" class="modal__label">
                            Mã loại tài sản <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="taiSan.maLoaiTS"  
                                v-bind:class="{'input--error': this.checkMaLoaiTS.hasError}" 
                                class="input input--haveicon" 
                                type="text"  
                                placeholder="Chọn mã loại tài sản"
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="modal__dropdown">
                                <div class="function__drilldown--box">
                                    <div class="function__drilldown--item function__drilldown--head">
                                        <div class="function__drilldown--id"><b>Mã</b></div>
                                        <div class="function__drilldown--name"><b>Tên loại tài sản</b></div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0001</div>
                                        <div class="function__drilldown--name">Máy vi tính xách tay</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0002</div>
                                        <div class="function__drilldown--name">Đồ dùng văn phòng</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0003</div>
                                        <div class="function__drilldown--name">Bóng đèn led điện tử</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0004</div>
                                        <div class="function__drilldown--name">Máy lọc nước</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0005</div>
                                        <div class="function__drilldown--name">Bàn ghế các loại</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0006</div>
                                        <div class="function__drilldown--name">Máy điều hoà</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0007</div>
                                        <div class="function__drilldown--name">Máy tủ lạnh</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0008</div>
                                        <div class="function__drilldown--name">Máy chiếu</div>
                                    </div>
                                    <div class="function__drilldown--item function__drilldown--body">
                                        <div class="function__drilldown--id">LTS0009</div>
                                        <div class="function__drilldown--name">Tivi tinh thể lỏng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkMaLoaiTS.hasError">Lỗi cú pháp</p>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label for="enter-tenloaitaisan" class="modal__label">
                            Tên loại tài sản 
                        </label>
                        <input v-model.trim="taiSan.tenLoaiTS" class="input input--disable" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-soluong" class="modal__label">
                            Số lượng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input v-model.trim="taiSan.soLuong" class="input input--haveicon input--textright" type="text">
                            <i class="icon icon--multidrop"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-nguyengia" class="modal__label">
                            Nguyên giá <em>*</em>
                        </label>
                        <input v-model.trim="taiSan.nguyenGia" class="input input--textright" type="text">
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-sonamsudung" class="modal__label">
                            Số năm sử dụng <em>*</em>
                        </label>
                        <input v-model.trim="taiSan.soNamSD" class="input input--textright" type="text">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-tylehaomon" class="modal__label">
                            Tỷ lệ hao mòn (%) <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input v-model.trim="taiSan.tyLeHM" class="input input--haveicon input--textright" type="text">
                            <i class="icon icon--multidrop"></i>
                        </div>

                    </div>
    
                    <div class="modal__item">
                        <label for="enter-giatrihaomonnam" class="modal__label">
                            Giá trị hao mòn năm <em>*</em>
                        </label>
                        <input v-model.trim="taiSan.giaTriHMNam" class="input input--textright" type="text">
                    </div>
     
                    <div class="modal__item">
                        <label for="enter-namtheodoi" class="modal__label">
                            Năm theo dõi 
                        </label>
                        <input v-model.trim="taiSan.namTheoDoi" class="input input--disable input--textright" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-ngaymua" class="modal__label">
                            Ngày mua <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                type="date" 
                                class="input" 
                                v-model.trim="taiSan.ngayMua"
                            >
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-ngaybatdausudung" class="modal__label">
                            Ngày bắt đầu sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input type="date" class="input" v-model.trim="taiSan.ngayBatDauSD">
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: Body modal -->

            <!-- BEGIN: Footer modal -->
            <footer class="modal__section modal__footer">
                <button type="submit" class="btn btn__save btn__save--space"  v-on:focus="tab()" >Lưu</button>
                <button style="display: none;"></button>
                <div @click="closeModal()" class="btn btn__cancel" >Hủy</div> 
            </footer>
            <!-- END: Footer modal -->
        </form>

        <!-- BEGIN: Success toast modal -->
        <div id="toast__box" v-html="htmlToast"></div>
        <!-- END: Success toast modal -->

        <!-- BEGIN: Alert close modal -->
        <div class="alert__box" :class="{'alert__box--open': displayAlert}">
            <div class="alert__content">
                <div class="alert__body">
                    <i class="icon icon-alert"></i>
                    <div class="alert__title">Bạn có muốn huỷ bỏ khai báo tài sản này?</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__outline" @click="closeAlert()">Không</button>
                    <button class="btn btn__save alert__button--space" @click="acceptAlert()">Huỷ bỏ</button>
                </div>
            </div>
        </div>
        <!-- END: Alert close modal -->
    </div>
</template>

<script>
/* import DropdownDatepicker from './src/dropdown-datepicker.vue'; */

    export default {
        name: "ProductList",
        component: {
/*             DropdownDatepicker, */
        },
        /* GD1: beforeCreated (setup) */
        setup() {
            console.log("beforeCreated");
/*             let nameProduct = this.getName.name;
            console.log(nameProduct); */
        },
        data() {
            return {
                /* Dữ liệu form modal */
                taiSan: {
                    maTaiSan: 'TS00001',
                    tenTaiSan: '',
                    maBPSD: '',
                    tenBPSD: '',
                    maLoaiTS: '',
                    tenLoaiTS: '',
                    soLuong: 0,
                    nguyenGia: 0,
                    soNamSD: 0,
                    tyLeHM: 0,
                    giaTriHMNam: 0,
                    namTheoDoi: new Date().getFullYear(),
                    ngayMua: new Date().toISOString().substring(0,10),
                    ngayBatDauSD: new Date().toISOString().substring(0,10),
                },

                hasfocus: false,

                /* Hiển thị modal */
                displayModal: false,

                /* Hiển thị cảnh báo khi huỷ*/
                displayAlert: false,

                /* Hiển thị thông báo lưu dữ liệu thành công */
                htmlToast: "",

                /* Hiển thị lỗi cảnh báo input */
                htmlError: "",

                /* Danh sách năm */
                years: [],

                /* BEGIN: Data loại tài sản */
                category: {
                    list: [
                        'Máy vi tính xách tay', 
                        'Đồ dùng văn phòng', 
                        'Đèn điện', 
                        'Máy lọc nước', 
                        'Tivi LCD', 
                        'Bàn ghế', 
                        'Máy điều hoà', 
                        'Quạt', 
                        'Máy tủ lạnh', 
                        'Máy chiếu'
                    ],
                    show: false,
                    value: 'Loại tài sản'
                },
                /* END: Data loại tài sản */

                /* BEGIN: Data bộ phận sử dụng */
                department: {
                    show: false,
                    value: 'Bộ phận sử dụng',
                    list: [
                        'Phòng kế toán',
                        'Phòng thư ký',
                        'Phòng giáo dục',
                        'Phòng nghiên cứu',
                        'Phòng customize',
                        'Phòng nhân sự - điều hành',
                        'Phòng doanh nghiệp',
                        'Phòng quản trị kinh doanh',
                        'Phòng giải pháp bán lẻ'
                    ]
                },
                /* END: Data bộ phận sử dụng */

                checkTenTaiSan: {
                    hasError: false
                },
                checkMaBPSD: {
                    hasError: false
                },
                checkMaLoaiTS: {
                    hasError: false
                },
                isCheckAll: false,
            }
        },
        methods: {
            /* BEGIN: Tài sản */
            selectCategory(option) {
                this.category.value = option;
            },
            /* END: Tài sản */

            /* BEGIN: Bộ phận sử dụng */
            selectDepartment(option) {
                this.department.value = option;
            }, 
            /* END: Bộ phận sử dụng */
            /* Focus vào một element
                @param {}
                @returns void
                Author: Tuan 
                Date: 30/10/2022 
            */
            focus (value) {
                this.hasfocus = value;
            },
            /* Tab rollback về mã tài sản
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            tab() {
                setTimeout(() => {
                   this.$refs.focusMe.focus();
                }, 300);
            },

            /* Mở modal
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            openModal() {
                this.displayModal = true;
                setTimeout(() => {
                   this.$refs.focusMe.focus();
                }, 200);
            },

            /* Đóng modal
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            closeModal() {
                this.openAlert();
            },

            /* Mở cảnh báo khi huỷ
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            openAlert() {
                this.displayAlert = true;
            },

            /* Đồng ý cảnh báo huỷ
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            acceptAlert() {
                this.displayModal = false;
                this.displayAlert = false;
                this.htmlToast = "",
                this.htmlError = "",
                this.checkTenTaiSan.hasError = false,
                this.checkMaBPSD.hasError = false,
                this.checkMaLoaiTS.hasError = false,
                this.taiSan = {
                    maTaiSan: 'TS00001',
                    tenTaiSan: '',
                    maBPSD: '',
                    tenBPSD: '',
                    maLoaiTS: '',
                    tenLoaiTS: '',
                    soLuong: 0,
                    nguyenGia: 0,
                    soNamSD: 0,
                    tyLeHM: 0,
                    giaTriHMNam: 0,
                    namTheoDoi: new Date().getFullYear(),
                    ngayMua: new Date().toISOString().substring(0,10),
                    ngayBatDauSD: new Date().toISOString().substring(0,10)
               }
            },

            /* Không đồng ý huỷ
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            closeAlert() {
                this.displayAlert = false;
            },

            /* Hiển thị thông báo dưới chân input
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            errorMessage() {
                this.htmlError = "<p class='error-message'>Lỗi cú pháp</p>";
            },

            /* add html thêm dữ liệu thành công
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            addHTMLToast() {
                this.htmlToast = "<div class='toast__item toast__item-success'><div class='toast__icon'><i class='fa-sharp fa-solid fa-circle-check'></i></div><div class='toast__text'>Lưu dữ liệu thành công</div></div>"
            },

            /* Hiển thị thông báo thêm dữ liệu thành công
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            showSuccessToast() {
                this.addHTMLToast();
                setTimeout(() => this.htmlToast = "", 5000)
            },

            /* Check dữ liệu khi lưu
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            onSubmit() {
                if(this.taiSan.tenTaiSan.trim() != "" && this.taiSan.maBPSD.trim() != "" && this.taiSan.maLoaiTS.trim() != "") {
                    this.checkTenTaiSan.hasError = false;
                    this.checkMaBPSD.hasError = false;
                    this.checkMaLoaiTS.hasError = false;
                    this.showSuccessToast();
                    console.log(this.taiSan);
                } else if (this.taiSan.tenTaiSan.trim() == "" && this.taiSan.maBPSD.trim() == "" && this.taiSan.maLoaiTS.trim() == "") {
                    this.checkTenTaiSan.hasError = true;
                    this.checkMaBPSD.hasError = true;
                    this.checkMaLoaiTS.hasError = true;
                } else if (this.taiSan.tenTaiSan.trim() == "" && this.taiSan.maBPSD.trim() == "") {
                    this.checkMaBPSD.hasError = true;
                    this.checkTenTaiSan.hasError = true;
                    this.checkMaLoaiTS.hasError = false; 
                } else if (this.taiSan.tenTaiSan.trim() == "" && this.taiSan.maLoaiTS.trim() == "") {
                    this.checkMaBPSD.hasError = false;
                    this.checkTenTaiSan.hasError = true;
                    this.checkMaLoaiTS.hasError = true;
                }
                else if (this.taiSan.maBPSD.trim() == "" && this.taiSan.maLoaiTS.trim() == "") {
                    this.checkMaLoaiTS.hasError = true;
                    this.checkMaBPSD.hasError = true;
                    this.checkTenTaiSan.hasError = false;
                } else if (this.taiSan.tenTaiSan.trim() == "") {
                    this.checkTenTaiSan.hasError = true;
                    this.checkMaBPSD.hasError = false;
                    this.checkMaLoaiTS.hasError = false;
                } else if (this.taiSan.maBPSD.trim() == "") {
                    this.checkMaBPSD.hasError = true;
                    this.checkMaLoaiTS.hasError = false;
                    this.checkTenTaiSan.hasError = false;
                } else if(this.taiSan.maLoaiTS.trim() == "") {
                    this.checkMaLoaiTS.hasError = true;
                    this.checkMaBPSD.hasError = false;
                    this.checkTenTaiSan.hasError = false;
                }

            },
        },

        /* GD2: created (setup) */
            /* Gọi API thực hiện lấy dữ liệu --> use axios */
        /* GD3: beforeCreated (setup) */
        /* GD4: Mounted (setup) */
        /* GD5: beforeUpdated (setup) */
        /* GD6: updated (setup) */
        /* GD7: beforeUnmount (beforeDestroy) */
        /* GD8: unmounted (destroyed) */


    }
</script>

<style scoped>





</style>