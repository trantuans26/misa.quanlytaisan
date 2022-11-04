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

                    <input class="input input--filter" type="text" :value="this.category.filter" tabindex="0" v-on:keyup.enter="this.category.show = !this.category.show" readonly>

                    <div class="function__icon--dropdown"> 
                        <i class="icon icon--dropdown"></i>
                    </div>

                    <div class="drilldown drilldown__normal" v-show="this.category.show">
                        <ul class="drilldown__box" >
                            <li 
                                class="drilldown__item" 
                                tabindex="0" 
                                :class="{'drilldown__item--selected': item.name == this.category.filter}"
                                v-for='item in this.category.list'
                                @click="selectCategory(item.name)"
                                v-on:keyup.enter="selectCategory(item.name), this.category.show = false "
                                :key="item.name"
                            >
                                <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                                <div class="drilldown__name">{{item.name}}</div>
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
                    
                    <input class="input input--filter" type="text" :value="this.department.filter" tabindex="0" v-on:keyup.enter="this.department.show = !this.department.show" readonly>

                    <div class="drilldown drilldown__normal" v-show="this.department.show">
                        <ul class="drilldown__box" >
                            <li 
                                class="drilldown__item" 
                                tabindex="0" 
                                :class="{'drilldown__item--selected': item.name == this.department.filter}"
                                v-for='item in this.department.list'
                                @click="selectDepartment(item.name)" 
                                v-on:keyup.enter="selectDepartment(item.name), this.department.show = false"
                                :key="item.name"
                            >
                                <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                                <div class="drilldown__name">{{item.name}}</div>
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
            <div class="table__header table__item">
                <table>
                    <thead>
                        <th class="table__col--left table__col--check">
                            <input type="checkbox" v-model='selectAll' @change="selectedAll()">
<!--                             <i class="icon icon-checkbox"></i> -->
                        </th>
                        <th class="table__col--center table__col--serial" data-title="Số thứ tự">STT</th>
                        <th class="table__col--left table__col--assetcode">Mã tài sản </th>
                        <th class="table__col--left table__col--assetname">Tên tài sản </th>
                        <th class="table__col--left table__col--category">Loại tàn sản </th>
                        <th class="table__col--left table__col--department">Bộ phận sử dụng  </th>
                        <th class="table__col--right table__col--quantity">Số lượng  </th>
                        <th class="table__col--right table__col--cost">Nguyên giá </th>
                        <th class="table__col--right tabel__col--depreciation" data-title="Hao mòn/khấu hao luỹ kế">HM/KH luỹ kế</th>
                        <th class="table__col--right table__col--residual">Giá trị còn lại </th>
                        <th class="table__col--center table__col--function">Chức năng</th>
                    </thead>
                </table>
            </div>

            <div class="table__content">
                <table>
                    <tbody>
                        <tr 
                            class="table__row" 
                            v-for="(asset,index) in this.assets"
                            :key="asset"
                            :class="{'table__row--checked': asset.checked}"
                        >
                            <td class="table__col--left table__col--check">
                               <input type="checkbox" v-model='selected' :value="asset.fixedAssetId" @click="asset.checked = !asset.checked" :checked="asset.checked">
                            </td>
                            <td class="table__col--center table__col--serial">{{index + 1}}</td>
                            <td class="table__col--left table__col--assetcode">{{asset.fixedAssetCode}}</td>
                            <td class="table__col--left table__col--assetname">{{asset.fixedAssetName}}</td>
                            <td class="table__col--left table__col--category">{{asset.categoryName}}</td>
                            <td class="table__col--left table__col--department">{{asset.departmentName}}</td>
                            <td class="table__col--right table__col--quantity">{{asset.quantity}}</td>
                            <td class="table__col--right table__col--cost">{{this.formatPriceNoFixed(asset.cost)}}</td>
                            <td class="table__col--right tabel__col--depreciation">{{this.formatPriceNoFixed(asset.depreciationRate * asset.cost)}}</td>
                            <td class="table__col--right table__col--residual">{{this.formatPriceNoFixed(asset.cost - (asset.depreciationRate * asset.cost))}}</td>
                            <td class="table__col--function table__col--center">
                                <div class="table__function">
                                    <div 
                                        class="table__icon js-open-modal" 
                                        data-title="Sửa tài sản" 
                                        @click= "
                                            openModal(),
                                            editAsset (
                                                asset.fixedAssetCode, asset.fixedAssetName, 
                                                asset.departmentCode, asset.departmentName, 
                                                asset.categoryCode, asset.categoryName,
                                                asset.quantity, this.formatPriceNoFixed(asset.cost), asset.lifeTime,
                                                this.formatPriceFixed(asset.depreciationRate), this.formatPriceNoFixed(asset.depreciationRate * asset.cost), asset.trackedYear,
                                                asset.purchaseDate
                                            )
                                        "
                                    >
                                        <i class="icon icon--edit"></i>
                                    </div>
                                    <div class="table__icon" data-title="Nhân bản">
                                        <i class="icon icon--detail"></i>
                                    </div>
                                </div>
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>

            <div class="table__footer">
                <table>
                    <tfoot>
                        <tr class="table__row--paging">
                            <td class="table__col--assetname" colspan="4">
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
                            <td class="table__col--lef table__col--categoryt">

                            </td>
                            <td class="table__col--left table__col--department">

                            </td>
                            <td class="table__col--right table__col--quantity">
                                {{sumQuantity()}}
                            </td>
                            <td class="table__col--right table__col--cost">
                                {{formatPriceNoFixed(sumCost())}}
                            </td>
                            <td class="table__col--right tabel__col--depreciation">
                                {{formatPriceNoFixed(sumDepreciation())}}
                            </td>
                            <td class="table__col--right table__col--residual">
                                {{formatPriceNoFixed(sumCost() - sumDepreciation())}}
                            </td>
                            <td class="table-col--center table__col--function">
                                
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
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
                        <p class="input__text--error" v-if="this.checkTenTaiSan.hasError">Tên tài sản không hợp lệ</p>
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
                        <p class="input__text--error" v-if="this.checkMaBPSD.hasError">Mã bộ phận sử dụng không hợp lệ</p>
                     

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
                        <p class="input__text--error" v-if="this.checkMaLoaiTS.hasError">Mã loại tài sản không hợp lệ</p>
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
                            <input v-model.trim="taiSan.soLuong" class="input input--haveicon input--textright input__spin--hide" v-on:keypress="NumbersOnly" type="text">
                            <i class="icon icon--multidrop"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-nguyengia" class="modal__label">
                            Nguyên giá <em>*</em>
                        </label>
                        <input v-model.trim="taiSan.nguyenGia" class="input input--textright input__spin--hide" v-on:keypress="NumbersOnly" type="text">
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-sonamsudung" class="modal__label">
                            Số năm sử dụng <em>*</em>
                        </label>
                        <input v-model.trim="taiSan.soNamSD" class="input input--textright input__spin--hide" v-on:keypress="NumbersOnly" type="text">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-tylehaomon" class="modal__label">
                            Tỷ lệ hao mòn (%) <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input v-model.trim="taiSan.tyLeHM" class="input input--haveicon input--textright input__spin--hide" v-on:keypress="NumbersOnly" type="text">
                            <i class="icon icon--multidrop"></i>
                        </div>

                    </div>
    
                    <div class="modal__item">
                        <label for="enter-giatrihaomonnam" class="modal__label">
                            Giá trị hao mòn năm <em>*</em>
                        </label>
                        <input v-model.trim="taiSan.giaTriHMNam" class="input input--textright input__spin--hide" v-on:keypress="NumbersOnly" type="text">
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
        <div id="toast__box" v-html="htmlToast">
        </div>
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
    export default {
        name: "ProductList",
        component: {
        },
        /* GD1: beforeCreated (setup) */
        setup() {

        },
        methods: {
            /* BEGIN: Tài sản */
            /* Lọc loại tài sản
                @param {option} giá trị đc chọn trong vòng lặp for
                @returns void
                Author: Tuan 
                Modified Date: 4/11/2022 
            */
            selectCategory(option) {
                if(option == this.category.filter) {
                    this.category.filter = 'Loại tài sản'
                } else {
                    this.category.filter = option;
                }
            },
            /* END: Tài sản */

            /* BEGIN: Bộ phận sử dụng */
            /* Lọc bộ phận sử dụng
                @param {option} giá trị đc chọn trong vòng lặp for
                @returns void
                Author: Tuan 
                Modified Date: 4/11/2022 
            */
            selectDepartment(option) {
                if(this.department.filter == option) {
                    this.department.filter = 'Loại bộ phận sử dụng'
                } else {
                    this.department.filter = option;
                }
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
                this.htmlToast = " <div class='toast__item'><div class='toast__icon'><i class='icon icon--success'></i></div><div class='toast__text'>Lưu dữ liệu thành công</div></div>"
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

            /* Dữ liệu kiểu số dấu chấm trước 3 số 0
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            formatPriceNoFixed(value) {
                let val = (value/1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

            /* Dữ liệu kiểu số dấu chấm trước 3 số 0 và có 2 số thập ph
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            formatPriceFixed(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

            /* Sửa tài sản
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            editAsset (
                fixedAssetCode, fixedAssetName, 
                departmentCode, departmentName, 
                categoryCode, categoryName,
                quantity, cost, lifeTime,
                depreciationRate, depreciation, trackedYear,
                purchaseDate
            ) {
                this.taiSan.maTaiSan = fixedAssetCode;
                this.taiSan.tenTaiSan = fixedAssetName;
                this.taiSan.maBPSD = departmentCode;
                this.taiSan.tenBPSD = departmentName;
                this.taiSan.maLoaiTS = categoryCode;
                this.taiSan.tenLoaiTS = categoryName;
                this.taiSan.soLuong = quantity;
                this.taiSan.nguyenGia = cost;
                this.taiSan.soNamSD = lifeTime;
                this.taiSan.tyLeHM = depreciationRate;
                this.taiSan.giaTriHMNam = depreciation;
                this.taiSan.namTheoDoi = trackedYear;
                this.taiSan.ngayBatDauSD = purchaseDate;
                this.taiSan.ngayMua = purchaseDate;
            },

            /* Chọn all checkbox
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            selectedAll() {
                this.assets.forEach(function (asset) {
                    asset.checked = !asset.checked;
                });
            },

            /* Input type="text" chỉ viết số
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */  
            numbersOnly(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },

            /* Tổng số lượng
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */ 
            sumQuantity() {
                let sumQuantity = 0;
                this.assets.forEach(function (asset) {
                    sumQuantity +=  parseInt(asset.quantity);
                });
                return sumQuantity;

            },

            /* Tổng nguyên giá
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            sumCost() {
                let sumCost = 0;
                this.assets.forEach(function (asset) {
                    sumCost += parseInt(asset.cost);
                });
                return sumCost;
            },

            /* Tổng hao mòn
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            sumDepreciation() {
                let sumDepreciation = 0;
                /* Check null vs undefined */
                this.assets.forEach(function (asset) {
                    sumDepreciation += (parseFloat(asset.cost) * parseFloat(asset.depreciationRate));
                });
                return sumDepreciation;
            }
        },

        data() {
            return {
                /* BEGIN: Dữ liệu table */ 
                selected: [],
                assets: [
                    { 
                        fixedAssetId: "00071", fixedAssetCode: "TS0399953", fixedAssetName: "Duy Phương Đặng 2005",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nghiên cứu", 
                        categoryId: "1", categoryCode: "1", categoryName: "Tivi LCD", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 31429572,
                        quantity: 19,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,
                    },
                    { 
                        fixedAssetId: "01253", fixedAssetCode: "TS1552121", fixedAssetName: "Bảo Ngân Đỗ 1970",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nhân sự - điều hành", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy vi tính xách tay", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 51763253,
                        quantity: 32,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "03129", fixedAssetCode: "TS1984925", fixedAssetName: "Long Hằng Phan 1951",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng doanh nghiệp", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy chiếu", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 27604747,
                        quantity: 69,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,
                    },
                    { 
                        fixedAssetId: "03470", fixedAssetCode: "TS0886710", fixedAssetName: "Hiếu Thu Đoàn 1964",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nghiên cứu", 
                        categoryId: "1", categoryCode: "1", categoryName: "Đồ dùng văn phòng", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 58454961,
                        quantity: 42,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "04309", fixedAssetCode: "TS1637806", fixedAssetName: "Quang Quỳnh Ngô 1967",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng Customize", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy chiếu", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 36978136,
                        quantity: 40,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "05134", fixedAssetCode: "TS0532603", fixedAssetName: "Dũng Kim Anh Lê 1956",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng giải pháp bán lẻ", 
                        categoryId: "1", categoryCode: "1", categoryName: "Tivi LCD", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 81174763,
                        quantity: 61,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "05242", fixedAssetCode: "TS0937281", fixedAssetName: "Chiến Ngân Phan 1999",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng kế toán", 
                        categoryId: "1", categoryCode: "1", categoryName: "Đồ dùng văn phòng", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 1612075,
                        quantity: 54,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "06442", fixedAssetCode: "TS1503628", fixedAssetName: "Linh Thảo Phan 2029",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng Tổng giám đốc", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy tủ lạnh", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 92596697,
                        quantity: 85,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "06604", fixedAssetCode: "TS1704254", fixedAssetName: "Tài Yến Đinh 1980",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng kế toán", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy điều hoà", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 1612075,
                        quantity: 14,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "08272", fixedAssetCode: "TS0795735", fixedAssetName: "Thịnh Mây Đỗ 1950",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng thư ký", 
                        categoryId: "1", categoryCode: "1", categoryName: "Tivi LCD", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 65,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "08452", fixedAssetCode: "TS1006468", fixedAssetName: "Thế Anh Huệ Nguyễn 2010",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nhân sự - điều hành", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy tủ lạnh", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 50,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "09328", fixedAssetCode: "TS1709912", fixedAssetName: "Vũ Mây Dương 2018",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng Tổng giám đốc", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy lọc nước", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 91,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "11583", fixedAssetCode: "TS0844758", fixedAssetName: "Linh Vy Phan 2025",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng kế toán", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy chiếu", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 3,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "13804", fixedAssetCode: "TS0713914", fixedAssetName: "Chiến Hằng Đỗ 1978",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng kế toán", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy vi tính xách tay", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 62,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "14056", fixedAssetCode: "TS1343179", fixedAssetName: "Thế Anh Ngọc Bùi 1987",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nhân sự - điều hành", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy vi tính xách tay", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 11,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "20367", fixedAssetCode: "TS1592707", fixedAssetName: "Linh Thu Trần 2018",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nhân sự - điều hành", 
                        categoryId: "1", categoryCode: "1", categoryName: "Đèn điện", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 65,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "20454", fixedAssetCode: "TS1728950", fixedAssetName: "Long Thảo Lê 1978",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng Customize", 
                        categoryId: "1", categoryCode: "1", categoryName: "Tivi LCD", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 95,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "21742", fixedAssetCode: "TS1785004", fixedAssetName: "Hùng Yến Hoàng 1977",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng giáo dục", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy tủ lạnh", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 17,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "21916", fixedAssetCode: "TS1711473", fixedAssetName: "Linh Oanh Trần 2011",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng giám đốc", 
                        categoryId: "1", categoryCode: "1", categoryName: "Bàn ghế", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 76,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                    { 
                        fixedAssetId: "22326", fixedAssetCode: "TS0562646", fixedAssetName: "Dũng Mây Bùi 1997",
                        organizationId: "1", organizationCode: "1", organizationName: "1", 
                        departmentId: "1", departmentCode: "1", departmentName: "Phòng nhân sự - điều hành", 
                        categoryId: "1", categoryCode: "1", categoryName: "Máy lọc nước", 
                        purchaseDate: new Date().toISOString().substring(0,10),
                        cost: 15000000,
                        quantity: 33,
                        depreciationRate: 0.1,
                        trackedYear: new Date().getFullYear(),
                        lifeTime: 2,
                        productionYear: "1",
                        active: 1,
                        createdBy: "Tuan",
                        createdDate: new Date().toISOString().substring(0,10),
                        modifiedBy: "Tuan",
                        modifiedDate: new Date().toISOString().substring(0,10),
                        checked: false,

                    },
                ],
                /* END: Dữ liệu table */

                /* BEGIN: Dữ liệu form modal */
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
                /* END: Dữ liệu form modal */

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
                        {
                            code: 'LTS0001',
                            name:  'Máy vi tính xách tay',
                        },
                        {
                            code: 'LTS0014',
                            name: 'Đồ dùng văn phòng', 
                        },
                        {
                            code: 'LTS0013',
                            name:  'Đèn điện',
                        },
                        {
                            code: 'LTS0011',
                            name:  'Máy lọc nước', 
                        },
                        {
                            code: 'LTS0012',
                            name:  'Tivi LCD', 
                        },
                        {
                            code: 'LTS0004',
                            name:  'Bàn ghế', 
                        },
                        {
                            code: 'LTS0007',
                            name:  'Máy điều hoà', 
                        },
                        {
                            code: 'LTS0002',
                            name:  'Quạt', 
                        },
                        {
                            code: 'LTS0010',
                            name:  'Máy tủ lạnh', 
                        },
                        {
                            code: 'LTS0005',
                            name:  'Máy chiếu'
                        },      
                    ],
                    show: false,
                    filter: 'Loại tài sản'
                },
                /* END: Data loại tài sản */

                /* BEGIN: Data bộ phận sử dụng */
                department: {
                    show: false,
                    filter: 'Bộ phận sử dụng',
                    list: [
                        {
                            code: "D0001",
                            name: 'Phòng kế toán',

                        },
                        {
                            code: "D0002",
                            name: 'Phòng thư ký',

                        },
                        {
                            code: "D0003",
                            name: 'Phòng giáo dục',

                        },
                        {
                            code: "D0004",
                            name: 'Phòng nghiên cứu',

                        },
                        {
                            code: "D0005",
                            name: 'Phòng customize',

                        },
                        {
                            code: "D0006",
                            name: 'Phòng nhân sự - điều hành',

                        },
                        {
                            code: "D0007",
                            name: 'Phòng doanh nghiệp',

                        },
                        {
                            code: "D0008",
                            name: 'Phòng quản trị kinh doanh',

                        },                       
                        {
                            code: "D0009",
                            name: 'Phòng giải pháp bán lẻ'
                        },
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
            }
        },

        computed: {
            /* Chọn dòng
                Object
                Author: Tuan 
                Date: 30/10/2022 
            */
            selectAll: {
                /*
                    @param {}
                    @returns this.assets ? this.selected.length == this.assets.length : false;
                */
                get: function () {
                    return this.assets ? this.selected.length == this.assets.length : false;
                },
                /*
                    @param {fixedAssetId}
                    @returns void
                */
                set: function (value) {
                    var selected = [];

                    if (value) {
                        
                        this.assets.forEach(function (asset) {
                            selected.push(asset.fixedAssetId);
                        });
                    }

                    this.selected = selected;
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