<template>
    <div class="content">
        <!-- BEGIN: Content/Function -->
        <div class="function">
            <div class="function__list">
                <div class="function__item function__item--maright  function__item--search">
                    <div class="function__icon"> 
                        <i class="icon icon--search"></i>
                    </div>
                    
                    <input class="input input--search" type="text" placeholder="Tìm kiếm tài sản">
                </div>

                <!-- BEGIN: Lọc loại tài sản -->
                <div 
                    class="function__item function__item--maright function__item--loaitaisan"        
                    @click="this.category.show = !this.category.show"
                    @mousedown="hideDrillDownBlur()"
                >
                    <div class="function__icon"> 
                        <i class="icon icon--filter"></i>
                    </div>

                    <input 
                        class="input input--filter" 
                        type="text" 
                        :value="this.category.filter"  
                        v-on:keyup.enter="this.category.show = !this.category.show" 
                        readonly
                    >

                    <div class="function__icon--dropdown"> 
                        <i class="icon icon--dropdown"></i>
                    </div>

                    <div class="drilldown drilldown__normal" 
                        v-show="this.category.show" 
                    >
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
                <button class="btn btn__add function__item--maleft" @click="openModal()">+ Thêm tài sản</button>

                <button class="btn btn__excel function__item--maleft" data-title="Xuất bảng tài sản">
                    <i class="icon icon--excel"></i>
                </button>    

                <button class="btn btn__del function__item--maleft" data-title="Xoá tài sản" @click="showAlertDelete()">
                    <i class="icon icon--del"></i>
                </button>    
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

        <!-- BEGIN: Alert delete -->
        <div class="alert__box" :class="{'alert__box--open': this.function.delete.empty}">
            <div class="alert__content">
                <div class="alert__body alert__body--delete">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title">Bạn chưa chọn tài sản để thực hiện xoá.</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__save alert__button--space" @click="toggleAlertDeleteEmpty()">Đóng</button>
                </div>
            </div>
        </div>        

        <div class="alert__box" :class="{'alert__box--open': this.function.delete.a}">
            <div class="alert__content">
                <div class="alert__body alert__body--delete">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title alert__title--delete">Bạn có muốn xoá tài sản <b>Mã - Tên tài sản</b>?</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__save alert__button--space" @click="toggleAlertDeleteARecord()">Đóng</button>
                </div>
            </div>
        </div>   

        <div class="alert__box" :class="{'alert__box--open': this.function.delete.multi}">
            <div class="alert__content">
                <div class="alert__body alert__body--delete">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title alert__title--delete"><b>{{this.function.delete.quantity}}</b> tài sản đã được chọn. Bạn có muốn xoá các tài sản này khỏi danh sách?</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__save alert__button--space" @click="toggleAlertDeleteRecords()">Đóng</button>
                </div>
            </div>
        </div>  
        <!-- END: Alert delete -->
    </div>

    <div class="modal" :class="{open: displayModal}">
        <form class="modal__main"  @submit.prevent="onSubmit()">
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
                        <label class="modal__label">
                            Mã tài sản <em>*</em>
                        </label>
                        <input ref="focusMe" v-model.trim="assetModal.fixedAssetCode" class="input input--modal" type="text" placeholder="Nhập mã tài sản" style="">
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên tài sản <em>*</em>
                        </label>
                        <input
                            v-model.trim="assetModal.fixedAssetName" 
                            v-bind:class="{'input--error': this.checkfixedAssetName.hasError}" 
                            class="input input--modal" type="text"  
                            placeholder="Nhập tên tài sản">
                        <p class="input__text--error" v-if="this.checkfixedAssetName.hasError">Tên tài sản không hợp lệ</p>
                    </div>
                </div>
                
                <div class="modal__line">
                    <div 
                        class="modal__item"
                        @click="this.department.show = !this.department.show"
                    >
                        <label class="modal__label">
                            Mã bộ phận sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="assetModal.departmentCode"  
                                v-bind:class="{'input--error': this.checkdepartmentCode.hasError}" 
                                class="input input--haveicon input--modal" type="text"  
                                placeholder="Chọn mã bộ phận sử dụng"
                            
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="drilldown drilldown--modal" 
                                v-show="this.department.show"
                            >
                                <ul class="drilldown__box" >
                                    <li class="drilldown__item drilldown__item--modal drilldown__item--header">
                                        <div class="drilldown__id"><b>Mã</b></div>
                                        <div class="drilldown__name"><b>Tên bộ phận sử dụng</b></div>
                                    </li>
                                    <li class="drilldown__item drilldown__item--modal" 
                                        :class="{'drilldown__item--selected': item.code == this.assetModal.departmentCode}"
                                        v-for='item in this.department.list'
                                        tabindex="0"
                                        @click="selectValueDepartment(item)"
                                        :key="item"
                                        v-on:keyup.enter="selectValueDepartment(item), this.department.show = false"
                                    >
                                        <div class="drilldown__id">{{item.code}}</div>
                                        <div class="drilldown__name">{{item.name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkdepartmentCode.hasError">Mã bộ phận sử dụng không hợp lệ</p>
                     

                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên bộ phận sử dụng
                        </label>
                        <input v-model.trim="assetModal.departmentName" class="input input--disable input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item"
                       @click="this.category.show = !this.category.show"
                    >
                        <label class="modal__label">
                            Mã loại tài sản <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="this.assetModal.categoryCode"  
                                v-bind:class="{'input--error': this.checkMaLoaiTS.hasError}" 
                                class="input input--haveicon input--modal" 
                                type="text"  
                                placeholder="Chọn mã loại tài sản"
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="drilldown drilldown--modal" 
                                v-show="this.category.show"
                            >
                                <ul class="drilldown__box" >
                                    <li class="drilldown__item drilldown__item--modal drilldown__item--header">
                                        <div class="drilldown__id"><b>Mã</b></div>
                                        <div class="drilldown__name"><b>Tên loại tài sản</b></div>
                                    </li>
                                    <li class="drilldown__item drilldown__item--modal" 
                                        :class="{'drilldown__item--selected': item.code == this.assetModal.categoryCode}"
                                        v-for='item in this.category.list'
                                        @click="selectValueCategory(item)"
                                        :key="item"
                                    >
                                        <div class="drilldown__id">{{item.code}}</div>
                                        <div class="drilldown__name">{{item.name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkMaLoaiTS.hasError">Mã loại tài sản không hợp lệ</p>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên loại tài sản 
                        </label>
                        <input v-model.trim="assetModal.categoryName" class="input input--disable input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Số lượng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input v-model.trim="assetModal.quantity" class="input input--haveicon input--textright input__spin--hide input--modal" v-on:keypress="NumbersOnly" type="text">
                            <i class="icon icon--multidrop"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Nguyên giá <em>*</em>
                        </label>
                        <input v-model.trim="assetModal.cost" class="input input--textright input__spin--hide input--modal" v-on:keypress="NumbersOnly" type="text">
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Số năm sử dụng <em>*</em>
                        </label>
                        <input v-model.trim="assetModal.purchaseDate" class="input input--textright input__spin--hide input--modal" v-on:keypress="NumbersOnly" type="text">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Tỷ lệ hao mòn (%) <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input v-model.trim="assetModal.depreciationRate" class="input input--haveicon input--textright input__spin--hide input--modal" v-on:keypress="NumbersOnly" type="text">
                            <i class="icon icon--multidrop"></i>
                        </div>

                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Giá trị hao mòn năm <em>*</em>
                        </label>
                        <input v-model.trim="assetModal.depreciation" class="input input--textright input__spin--hide input--modal" v-on:keypress="NumbersOnly" type="text">
                    </div>
     
                    <div class="modal__item">
                        <label class="modal__label">
                            Năm theo dõi 
                        </label>
                        <input v-model.trim="assetModal.namTheoDoi" class="input input--disable input--textright input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Ngày mua <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                type="date" 
                                class="input input--modal" 
                                v-model.trim="assetModal.ngayMua"
                            >
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Ngày bắt đầu sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input type="date" class="input input--modal" v-model.trim="assetModal.ngayBatDauSD">
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: Body modal -->

            <!-- BEGIN: Footer modal -->
            <footer class="modal__section modal__footer">
                <button type="submit" class="btn btn__save btn__save--space">Lưu</button>
                <div tabindex="0" type="cancel" @click="closeModal()" class="btn btn__cancel" >Hủy</div> 
                <button v-on:focus="tabRollback()" class="btn__tabRollback"></button>
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
                    <i class="icon icon--alert"></i>
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
        directives: {
        },
        methods: {
            /* Focus vào một element
                @param {}
                @returns void
                Author: Tuan 
                Date: 30/10/2022 
            */
            focus (value) {
                this.hasfocus = value;
            },

            //#region Tài sản
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

            /* Đưa tài sản vào input modal
                @param {option} giá trị đc chọn trong vòng lặp for
                @returns void
                Author: Tuan 
                Modified Date: 4/11/2022 
            */
            selectValueCategory(option) {
                if(option.code == this.assetModal.categoryCode) {
                    this.assetModal.categoryCode = null
                    this.assetModal.categoryName = null
                } else {
                    this.assetModal.categoryCode = option.code;
                    this.assetModal.categoryName = option.name;     
                }
            },
            //#endregion Tài sản

            //#region Bộ phận sử dụng
            /* Lọc bộ phận sử dụng
                @param {option} giá trị đc chọn trong vòng lặp for
                @returns void
                Author: Tuan 
                Modified Date: 4/11/2022 
            */
            selectDepartment(option) {
                if(option == this.department.filter) {
                    this.department.filter = 'Loại bộ phận sử dụng'
                } else {
                    this.department.filter = option;
                }
            },

            /* Đưa phòng ban vào input modal
                @param {option} giá trị đc chọn trong vòng lặp for
                @returns void
                Author: Tuan 
                Modified Date: 4/11/2022 
            */
            selectValueDepartment(option) {
                if(option.code == this.assetModal.departmentCode) {
                    this.assetModal.departmentCode = null
                    this.assetModal.departmentName = null
                } else {
                    this.assetModal.departmentCode = option.code;
                    this.assetModal.departmentName = option.name;     
                }
            },           
            //#endregion Bộ phận sử dụng

            //#region Modal
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
                this.checkfixedAssetName.hasError = false,
                this.checkdepartmentCode.hasError = false,
                this.checkMaLoaiTS.hasError = false,
                this.assetModal = {
                    fixedAssetCode: 'TS00001',
                    fixedAssetName: '',
                    departmentCode: '',
                    departmentName: '',
                    categoryCode: '',
                    categoryName: '',
                    quantity: 0,
                    cost: 0,
                    purchaseDate: 0,
                    depreciationRate: 0,
                    depreciation: 0,
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
                if(this.assetModal.fixedAssetName.trim() != "" && this.assetModal.departmentCode.trim() != "" && this.assetModal.categoryCode.trim() != "") {
                    this.checkfixedAssetName.hasError = false;
                    this.checkdepartmentCode.hasError = false;
                    this.checkMaLoaiTS.hasError = false;
                    this.showSuccessToast();
                    console.log(this.assetModal);
                } else if (this.assetModal.fixedAssetName.trim() == "" && this.assetModal.departmentCode.trim() == "" && this.assetModal.categoryCode.trim() == "") {
                    this.checkfixedAssetName.hasError = true;
                    this.checkdepartmentCode.hasError = true;
                    this.checkMaLoaiTS.hasError = true;
                } else if (this.assetModal.fixedAssetName.trim() == "" && this.assetModal.departmentCode.trim() == "") {
                    this.checkdepartmentCode.hasError = true;
                    this.checkfixedAssetName.hasError = true;
                    this.checkMaLoaiTS.hasError = false; 
                } else if (this.assetModal.fixedAssetName.trim() == "" && this.assetModal.categoryCode.trim() == "") {
                    this.checkdepartmentCode.hasError = false;
                    this.checkfixedAssetName.hasError = true;
                    this.checkMaLoaiTS.hasError = true;
                }
                else if (this.assetModal.departmentCode.trim() == "" && this.assetModal.categoryCode.trim() == "") {
                    this.checkMaLoaiTS.hasError = true;
                    this.checkdepartmentCode.hasError = true;
                    this.checkfixedAssetName.hasError = false;
                } else if (this.assetModal.fixedAssetName.trim() == "") {
                    this.checkfixedAssetName.hasError = true;
                    this.checkdepartmentCode.hasError = false;
                    this.checkMaLoaiTS.hasError = false;
                } else if (this.assetModal.departmentCode.trim() == "") {
                    this.checkdepartmentCode.hasError = true;
                    this.checkMaLoaiTS.hasError = false;
                    this.checkfixedAssetName.hasError = false;
                } else if(this.assetModal.categoryCode.trim() == "") {
                    this.checkMaLoaiTS.hasError = true;
                    this.checkdepartmentCode.hasError = false;
                    this.checkfixedAssetName.hasError = false;
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

            /* Tab rollback về mã tài sản
                @param {}
                @returns void
                Author: Tuan 
                Date: 23/10/2022 
            */
            tabRollback() {
                setTimeout(() => {
                   this.$refs.focusMe.focus();
                }, 1);
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
            //#endregion Modal

            //#region Table 
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
                this.assetModal.fixedAssetCode = fixedAssetCode;
                this.assetModal.fixedAssetName = fixedAssetName;
                this.assetModal.departmentCode = departmentCode;
                this.assetModal.departmentName = departmentName;
                this.assetModal.categoryCode = categoryCode;
                this.assetModal.categoryName = categoryName;
                this.assetModal.quantity = quantity;
                this.assetModal.cost = cost;
                this.assetModal.purchaseDate = lifeTime;
                this.assetModal.depreciationRate = depreciationRate;
                this.assetModal.depreciation = depreciation;
                this.assetModal.namTheoDoi = trackedYear;
                this.assetModal.ngayBatDauSD = purchaseDate;
                this.assetModal.ngayMua = purchaseDate;
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
            },

            /* Toggle xoá rỗng
                @param {}
                @returns void
                Author: Tuan 
                Date: 7/11/2022 
            */
            toggleAlertDeleteEmpty() {
                this.function.delete.empty = !this.function.delete.empty;
            },

            /* Toggle xoá 1
                @param {}
                @returns void
                Author: Tuan 
                Date: 7/11/2022 
            */
            toggleAlertDeleteARecord() {
                this.function.delete.a = !this.function.delete.a;
            },

            /* Toggle xoá nhiều
                @param {}
                @returns void
                Author: Tuan 
                Date: 7/11/2022 
            */
            toggleAlertDeleteRecords() {
                this.function.delete.multi = !this.function.delete.multi;
            },


            /* Kiểu số khi xoá nhiều
                @param {}
                @returns void
                Author: Tuan 
                Date: 7/11/2022 
            */
            numberRecordsDeleted() {
                if (this.selected.length < 10) {
                    this.function.delete.quantity = '0' + this.selected.length;
                } else {
                    this.function.delete.quantity = this.selected.length;
                }
            },

            /* Toggle show alert delete
                @param {}
                @returns void
                Author: Tuan 
                Date: 7/11/2022 
            */
            showAlertDelete() {
                if (this.selected.length == 0) {
                    this.toggleAlertDeleteEmpty();
                } else if (this.selected.length == 1) {
                    this.toggleAlertDeleteARecord();
                } else if (this.selected.length > 1) {
                    this.toggleAlertDeleteRecords();
                    this.numberRecordsDeleted();
                }
            },
            //#endregion Table

            /* Ẩn dropdown khi blur
                @param {}
                @returns void
                Author: Tuan 
                Date: 31/10/2022 
            */
            hideDrillDownBlur() {

            },
        },

        data() {
            return {
                pickerVisible: false,
                //#region Table
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

                function: {
                    delete: {
                        empty: false,
                        a: false,
                        multi: false,
                        quantity: '',
                    },
                },
                //#endregion Table

                /* BEGIN: Dữ liệu form modal */
                assetModal: {
                    fixedAssetCode: 'TS00001',
                    fixedAssetName: '',
                    departmentCode: '',
                    departmentName: '',
                    categoryCode: '',
                    categoryName: '',
                    quantity: 0,
                    cost: 0,
                    purchaseDate: 0,
                    depreciationRate: 0,
                    depreciation: 0,
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
                    filter: 'Loại tài sản',
                    value: {
                        code: null,
                        name: null,
                    }
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

                checkfixedAssetName: {
                    hasError: false
                },
                checkdepartmentCode: {
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