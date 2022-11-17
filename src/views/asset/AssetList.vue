<template>
    <div class="content">
        <!-- BEGIN: Content/Function -->
        <div class="function">
            <div class="function__list">
                <div class="function__item function__item--search function__item--maright">
                    <div class="function__icon" > 
                        <i class="icon icon--search"></i>
                    </div>
                    
                    <input class="input input--search" @change="this.setTotalPageIndex()" @keyup="searchKeyword()" v-model.trim="this.filter.keyword" type="text" placeholder="Tìm kiếm tài sản">
                </div>

                <div class="function__item function__item--category function__item--filter function__item--maright"        
                    ref="drilldown"
                    @click="this.category.showFilter = !this.category.showFilter"
                >
                    <div class="function__icon"> 
                        <i class="icon icon--filter"></i>
                    </div>

                    <input 
                        class="input input--filter" 
                        type="text" 
                        :value="this.category.filter"  
                        v-on:change.enter="this.category.showFilter = !this.category.showFilter" 
                        readonly
                        @blur="hideCategoryFilter()"             
                    >

                    <div 
                        class="function__icon--dropdown"
                    > 
                        <i class="icon icon--dropdown"></i>
                    </div>

                    <div class="drilldown drilldown__normal" 
                        v-show="this.category.showFilter" 
                    >
                        <ul class="drilldown__box" >
                            <li 
                                class="drilldown__item" 
                                tabindex="0" 
                                :class="{'drilldown__item--selected': item.fixed_asset_category_name == this.category.filter}"
                                v-for='item in this.categories'
                                @click="filterCategory(item)"
                                v-on:change.enter="filterCategory(item), this.category.showFilter = false"
                                :key="item"
                            >
                                <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                                <div class="drilldown__name">{{item.fixed_asset_category_name}}</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="function__item function__item--maright function__item--filter function__item--department" 
                    @click="this.department.showFilter = !this.department.showFilter"
                    ref="drilldown"
                >
                    <div class="function__icon"> 
                        <i class="icon icon--filter"></i>
                    </div>

                    <div class="function__icon--dropdown"> 
                        <i class="icon icon--dropdown"></i>
                    </div>
                    
                    <input class="input input--filter" 
                        type="text" 
                        :value="this.department.filter" 
                        tabindex="0" 
                        v-on:change.enter="this.department.showFilter = !this.department.showFilter" 
                        @blur="hideDepartmentFilter()"  
                        readonly
                    >

                    <div class="drilldown drilldown__normal" v-show="this.department.showFilter">
                        <ul class="drilldown__box" >
                            <li 
                                class="drilldown__item" 
                                tabindex="0" 
                                :class="{'drilldown__item--selected': item.department_name == this.department.filter}"
                                v-for='item in this.departments'
                                @click="filterDepartment(item)" 
                                v-on:change.enter="filterDepartment(item), this.department.showFilter = false"
                                :key="item"
                            >
                                <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                                <div class="drilldown__name">{{item.department_name}}</div>
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>

            <div class="function__list">
                <button class="btn btn__add function__item--maleft" @click="openModal()">+ Thêm tài sản</button>

                <button class="btn btn__excel function__item--maleft" data-title="Xuất bảng tài sản">
                    <i class="icon icon--excel"></i>
                </button>    

                <button
                    class="btn btn__del function__item--maleft" 
                    :class="{'btn--disable': this.function.delete.empty}" 
                    data-title="Xoá tài sản" 
                    :tabindex="this.function.delete.empty ? -1 : 1"
                    @click="showAlertDelete()">
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
                            <input type="checkbox" v-model.trim='selectAll'>
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
                        <th class="table__col--right table__col--function">Chức năng</th>
                    </thead>
                </table>
            </div>

            <div class="table__content">
                <table>
                    <tbody>
                        <tr 
                            class="table__row" 
                            v-for="(asset,index) in this.assetsFilter"
                            :key="asset"
                            :class="{'table__row--checked': checkBackground(asset.fixed_asset_id)}"
                            @dblclick="doubleClickRow(asset.fixed_asset_id)"
                        >
                            <td class="table__col--left table__col--check">
                               <input type="checkbox" v-model.trim='selectedFixedAssetById' :value="asset.fixed_asset_id">
                            </td>
                            <td class="table__col--center table__col--serial">{{((this.filter.pageIndex - 1) * this.filter.pageSize) + (index + 1)}}</td>
                            <td class="table__col--left table__col--assetcode">{{asset.fixed_asset_code}}</td>
                            <td class="table__col--left table__col--assetname">{{asset.fixed_asset_name}}</td>
                            <td class="table__col--left table__col--category">{{asset.fixed_asset_category_name}}</td>
                            <td class="table__col--left table__col--department">{{asset.department_name}}</td>
                            <td class="table__col--right table__col--quantity">{{asset.quantity}}</td>
                            <td class="table__col--right table__col--cost">{{this.formatNumber(asset.cost)}}</td>
                            <td class="table__col--right tabel__col--depreciation">{{this.formatNumber(asset.depreciation_rate/100 * asset.cost)}}</td>
                            <td class="table__col--right table__col--residual">{{this.formatNumber(asset.cost - (asset.depreciation_rate/100 * asset.cost))}}</td>
                            <td class="table__col--right table__col--function">
                                <div class="table__function">
                                    <div 
                                        class="table__icon js-open-modal" 
                                        data-title="Sửa tài sản" 
                                        @click= "
                                            openModal(),
                                            editAsset (
                                                asset.fixed_asset_code, asset.fixed_asset_name, 
                                                asset.department_code, asset.department_name, 
                                                asset.category_code, asset.category_name,
                                                asset.quantity, this.formatNumber(asset.cost), asset.life_time,
                                                this.formatRate(asset.depreciation_rate), this.formatNumber(asset.depreciation_rate/100 * asset.cost), asset.tracked_year,
                                                asset.purchase_date
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
                                    <div class="table__sum">Tổng số: <b>{{this.assets.length}} bản ghi</b></div>
                                    <div class="table__size" @click="toggleSelectPageSize()">
                                        <div class="table__subsize--selected">
                                            {{this.filter.pageSize}}
                                            <i class="icon icon--dropdown"></i>
                                        </div>
                                        
                                        <div class="drilldown drilldown__normal drilldown--pagesize" v-show="this.showPageSize">
                                            <ul class="drilldown__box" >
                                                <li 
                                                    class="drilldown__item" 
                                                    tabindex="0" 
                                                    :class="{'drilldown__item--selected': item == this.filter.pageSize}"
                                                    v-for='item in this.pageSizes'
                                                    @click="selectPageSize(item), setTotalPageIndex()"
                                                    :key="item"
                                                >
                                                {{item}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="pagination__list">
                                        <div class="pagination__item pagination__item--icon" @click="prevPage()">
                                            <i class="icon icon--pagingleft"></i>
                                        </div>
                                        <div class="pagination__item pagination__item--value">
                                            <div class="pagination__subitem pagination__subitem--selected"><b>{{this.filter.pageIndex}}</b></div>
                                            
                                            <div class="pagination__subitem" v-show="this.filter.pageSize != 500 && this.assetsFilter.length == 20">...</div>

                                            <div class="pagination__subitem"
                                                v-show="this.filter.pageSize != 500 && this.assetsFilter.length == 20"
                                                @click="this.filter.pageIndex = this.filter.totalPage"
                                            >{{this.filter.totalPage}}</div>
                                        </div>
                                        <div class="pagination__item pagination__item--icon" @click="nextPage()">
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
                                {{formatNumber(sumCost())}}
                            </td>
                            <td class="table__col--right tabel__col--depreciation">
                                {{formatNumber(sumDepreciation())}}
                            </td>
                            <td class="table__col--right table__col--residual">
                                {{formatNumber(sumCost() - sumDepreciation())}}
                            </td>
                            <td class="table-col--right table__col--function">
                                
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <!-- END: Content/Table -->

        <TheDelete/>
    </div>

    <div class="modal" :class="{'modal--open': displayModal}">
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
                
                <!-- Bộ phận sử dụng -->
                <div class="modal__line">
                    <div 
                        class="modal__item"
                        @click="this.department.showModal = !this.department.showModal"
                    >
                        <label class="modal__label">
                            Mã bộ phận sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="assetModal.departmentCode"  
                                v-bind:class="{'input--error': this.checkDepartmentCode.hasError}" 
                                class="input input--haveicon input--modal" type="text"  
                                placeholder="Chọn mã bộ phận sử dụng"
                                @blur="hideDepartmentModal()"
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="drilldown drilldown--modal" 
                                v-show="this.department.showModal"
                            >
                                <ul class="drilldown__box" >
                                    <li class="drilldown__item drilldown__item--modal drilldown__item--header">
                                        <div class="drilldown__id"><b>Mã</b></div>
                                        <div class="drilldown__name"><b>Tên bộ phận sử dụng</b></div>
                                    </li>
                                    <li class="drilldown__item drilldown__item--modal" 
                                        :class="{'drilldown__item--selected': department.department_code == this.assetModal.departmentCode}"
                                        v-for='department in this.departments'
                                        tabindex="0"
                                        @click="selectValueDepartment(department)"
                                        :key="department"
                                        v-on:change.enter="selectValueDepartment(department), this.department.show = false"
                                    >
                                        <div class="drilldown__id">{{department.department_code}}</div>
                                        <div class="drilldown__name">{{department.department_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkDepartmentCode.hasError">Mã bộ phận sử dụng không hợp lệ</p>
                     

                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên bộ phận sử dụng
                        </label>
                        <input v-model.trim="assetModal.departmentName" class="input input--disable input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <!-- Loại tài sản -->
                <div class="modal__line">
                    <div class="modal__item"
                       @click="this.category.showModal = !this.category.showModal"
                    >
                        <label class="modal__label">
                            Mã loại tài sản <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="this.assetModal.categoryCode"  
                                v-bind:class="{'input--error': this.checkFixedAssetCategoryCode.hasError}" 
                                class="input input--haveicon input--modal" 
                                type="text"  
                                placeholder="Chọn mã loại tài sản"
                                @blur="hideCategoryModal()"
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="drilldown drilldown--modal" 
                                v-show="this.category.showModal"
                            >
                                <ul class="drilldown__box" >
                                    <li class="drilldown__item drilldown__item--modal drilldown__item--header">
                                        <div class="drilldown__id"><b>Mã</b></div>
                                        <div class="drilldown__name"><b>Tên loại tài sản</b></div>
                                    </li>
                                    <li class="drilldown__item drilldown__item--modal" 
                                        :class="{'drilldown__item--selected': category.code == this.assetModal.categoryCode}"
                                        v-for='category in this.categories'
                                        @click="selectValueCategory(category)"
                                        :key="category"
                                    >
                                        <div class="drilldown__id">{{category.fixed_asset_category_code}}</div>
                                        <div class="drilldown__name">{{category.fixed_asset_category_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkFixedAssetCategoryCode.hasError">Mã loại tài sản không hợp lệ</p>
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
                        <div class="modal__input--icon modal__input--quantity">
                            <input 
                                v-model.trim="assetModal.quantity" 
                                class="input input--quantity input--haveicon input--textright input--modal" 
                                ref="input" 
                                type="text"
                                @keypress="this.numbersOnly"                       
                            >
                            <i class="icon icon--multidrop"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Nguyên giá <em>*</em>
                        </label>
                        <input class="input input--textright input__spin--hide input--modal" 
                            type="text"  
                            @keypress="this.numbersOnly"                       
                            v-model.trim="assetModal.cost"
                            @change="validateFormInput('cost')" 
                        >
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Số năm sử dụng <em>*</em>
                        </label>
                        <input 
                            v-model.trim="assetModal.purchaseDate" 
                            class="input input--textright input__spin--hide input--modal" 
                            v-on:keypress="this.numbersOnly"
                            ref="input"
                            type="text"
                        >
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Tỷ lệ hao mòn (%) <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="assetModal.depreciation_rate" 
                                class="input input--haveicon input--textright input__spin--hide input--modal" 
                                v-on:keypress="this.numbersOnly"
                                ref="input" 
                                type="text"
                                @change="validateFormInput('depreciation_rate')" 
                            >
                            <i class="icon icon--multidrop"></i>
                        </div>

                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Giá trị hao mòn năm <em>*</em>
                        </label>
                        <input 
                            v-model.trim="assetModal.depreciation" 
                            class="input input--textright input__spin--hide input--modal" 
                            v-on:keypress="this.numbersOnly"
                            ref="input" 
                            type="text"
                            @change="validateFormInput('depreciation')" 
                        >
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
        <div id="toast__box" v-html="htmlToastSuccess">
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
import axios from "axios";
import Resource from "@/lib/resource";
import TheDelete from "@/components/function/TheDelete.vue";

export default {
    name: "AssetList",
    components: {
        TheDelete,
    },

    beforeCreate() {
        
    },

    created() {
        // trước khi load dữ liệu thì hiện trạng thái tải data
        // gọi api để lấy dữ liệu sử dụng axios
        axios.get(`${Resource.Url.FixedAssets}`)
        .then((resource) => {
            console.log(resource.data);
            this.assets = resource.data;
        })

        this.loadData();

        axios.get(`${Resource.Url.FixedAssetCategories}`)
        .then((resource) => {
            this.categories = resource.data;
        })

        axios.get(`${Resource.Url.Departments}`)
        .then((resource) => {
            this.departments = resource.data;
        })
    },


    setup() {


/*             try {

            // gọi api để lấy dữ liệu sử dụng axios
            axios
            .get("https://localhost:44380/api/v1/Assets/export")
            .then((response) => {
                console.log(response);
                let url = response.request.responseURL; // đường dẫn tải file
                window.open(url);
            })
            .catch((response) => {
                console.log("response: ", response.response.status);
                me.handleException(
                response.response.status,
                response.response.data.moreInfo,
                response.response.data.userMsg
                );
            });
        } catch (error) {
            console.log(error);
        } */
    },
    
    /* Khởi tạo giá trị mặc định khi vào DOM thật */
    beforeMount() {
        this.deleteDisable();
    },

    /* DOM thật */
    Mounted() {

    },

    beforeUpdate() {
        
    },

    updated() {
        this.deleteDisable();
        this.loadData();
        this.setTotalPageIndex();
    },

    beforeUnmount() {
        
    },

    unmounted() {
        
    },

    directives: {
    },

    methods: {
        //#region Method Table Pagination
        //#endregion
        /* Load table
            @param {}
            @returns void
            Author: Tuan 
            Date: 30/10/2022 
        */
        loadData() {
            try {
                axios.get(`${Resource.Url.FixedAssets}/filter?keyword=${this.filter.keyword}&fixedAssetCategoryId=${this.filter.fixedAssetCategoryId}&departmentId=${this.filter.departmentId}&limit=${this.filter.pageSize}&offset=${this.filter.pageIndex}`)
                .then((resource) => {
                    console.log(resource.data);
                    this.assetsFilter = resource.data;
                    console.log(this.assetsFilter);
                })
            } catch (e) {
                console.log(e);
            }

            axios.get(`${Resource.Url.FixedAssets}/filter?keyword=${this.filter.keyword}&fixedAssetCategoryId=${this.filter.fixedAssetCategoryId}&departmentId=${this.filter.departmentId}&limit=500&offset=1`)
            .then((res) => {
                    console.log(res.data);
                    this.assetsFilterNoLimit = res.data;
                    console.log(this.assetsFilterNoLimit);
            })
        },

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
        filterCategory(category) {
            this.filter.pageIndex = 1;
            if(category.fixed_asset_category_name == this.category.filter) {
                this.category.filter = 'Loại tài sản'
                this.filter.fixedAssetCategoryId = "";
            } else {
                this.category.filter = category.fixed_asset_category_name;
                this.filter.fixedAssetCategoryId = category.fixed_asset_category_id;
            }
        },

        /* Ẩn dropdown khi blur
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        hideCategoryFilter() {
            setTimeout(() => {
                    this.category.showFilter = false;
            }, 200);  
        },

        /* Ẩn dropdown khi blur
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        hideCategoryModal() {
            setTimeout(() => {
                this.category.showModal = false;
            }, 200);  
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
                this.assetModal.categoryCode = option.fixed_asset_category_code;
                this.assetModal.categoryName = option.fixed_asset_category_name;     
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
        filterDepartment(department) {
            this.filter.pageIndex = 1;
            if(department.department_name == this.department.filter) {
                this.department.filter = 'Loại bộ phận sử dụng'
                this.filter.departmentId = "";
            } else {
                this.department.filter = department.department_name;
                this.filter.departmentId = department.department_id;
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
                this.assetModal.departmentCode = option.department_code;
                this.assetModal.departmentName = option.department_name;     
            }
        },           

        /* Ẩn dropdown khi blur
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        hideDepartmentFilter() {
            setTimeout(() => {
                this.department.showFilter = false;
            }, 200);  
        },

        /* Ẩn dropdown khi blur
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        hideDepartmentModal() {
            setTimeout(() => {
                this.department.showModal = false;
            }, 200);  
        },
        //#endregion Bộ phận sử dụng

        //#region Modal method
        //#region Modal click events 
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
            this.htmlToastSuccess = "",
            this.htmlError = "",
            this.checkfixedAssetName.hasError = false,
            this.checkDepartmentCode.hasError = false,
            this.checkFixedAssetCategoryCode.hasError = false,
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
        //#endregion Modal click events 

        //#region Modal processing ui
        /* add html thêm dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        addHTMLToast() {
            this.htmlToastSuccess = " <div class='toast__item'><div class='toast__icon'><i class='icon icon--success'></i></div><div class='toast__text'>Lưu dữ liệu thành công</div></div>"
        },

        /* Hiển thị thông báo thêm dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        showSuccessToast() {
            this.addHTMLToast();
                setTimeout(() => this.htmlToastSuccess = "", 5000)
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
        //#endregion Modal processing ui

        //#region Modal validate input
        /* Định dạng dữ liệu cho giá (200000 => 200.000)
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        formatNumber(number) {
            if (number && !isNaN(number)) {
                let val = (number/1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            } else 
                return number;
        },

        /* Định dạng dữ liệu cho tỷ lệ hao mòn (6.5 => 6,5)
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        formatRate(number) {
            if (number && !isNaN(number)) {
                let val = (number/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            } else 
                return number;
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

        validateFormInput(value) {
            if (value == 'cost') {
                this.assetModal.cost = this.formatNumber(this.assetModal.cost);
            } else if (value == 'depreciation') {
                this.assetModal.depreciation = this.formatNumber(this.assetModal.depreciation);
            } else if (value == 'depreciationRate') {
                this.assetModal.depreciationRate = this.formatRate(this.assetModal.depreciationRate);
            }
        },

        /**
         * Hàm nhập số tiền vào ô thì tự format số 
         */
         showValueCost() {
            let cost = this.assetModal.cost;
            if (cost != 0) {
                let tmpCost = cost.replace(/[^0-9]/g, '');
                let showCost = this.formartNumber(tmpCost);
                this.assetModal.cost = showCost;
            }
        },
        /**
         * Hàm formart số  
         */
        formartNumber(number) {
            if (number && !isNaN(number)) {
                return number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
            } else {
                return number;
            }
        },
        //#endregion Modal validate input








        //#endregion Modal

        //#region Method Table 
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

        /* Tổng số lượng
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */ 
        sumQuantity() {
            let sumQuantity = 0;
            this.assets.forEach(function (asset) {
                if (asset.quantity == '' || asset.quantity == null || asset.quantity == undefined) {
                    sumQuantity = sumQuantity + 0;
                } else {
                    sumQuantity = sumQuantity + (asset.quantity);
                }
            });
            console.log(sumQuantity);
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
                sumDepreciation += ((asset.cost) * (asset.depreciation_rate / 100));
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
            if (this.selectedFixedAssetById.length < 10) {
                this.function.delete.quantity = '0' + this.selectedFixedAssetById.length;
            } else {
                this.function.delete.quantity = this.selectedFixedAssetById.length;
            }
        },

        /* Toggle show alert delete
            @param {}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        showAlertDelete() {
            if (this.selectedFixedAssetById.length == 1) {
                this.toggleAlertDeleteARecord();
                for (var i = 0; i < this.assets.length; i++) {
                    if (this.assets[i].fixed_asset_id == this.selectedFixedAssetById[0]) {
                        this.function.delete.fixedAssetCode = this.assets[i].fixed_asset_code;
                        this.function.delete.fixedAssetName = this.assets[i].fixed_asset_name;
                    }
                }
            } else if (this.selectedFixedAssetById.length > 1) {
                this.toggleAlertDeleteRecords();
                this.numberRecordsDeleted();
            }
        },

        /* Double click chọn dòng
            @param {}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        doubleClickRow(id) {
            var check = false;
            for(var i = 0; i < this.selectedFixedAssetById.length; i++) {
                if(id == this.selectedFixedAssetById[i]) {
                    this.selectedFixedAssetById.splice(i,1);
                    check = true;
                    break;
                }
            }

            if(!check) {
                this.selectedFixedAssetById.push(id);
            }
        },

        /* Binding css cho dòng được chọn
            @param {}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        checkBackground(id) {
            for(var i = 0; i < this.selectedFixedAssetById.length; i++) {
                if(id == this.selectedFixedAssetById[i]) {
                    return true;
                }
            }

            return false;
        },

        /* Chọn số dòng hiển thị table
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        selectPageSize(option) {
            if(option == "All") {
                this.filter.pageSize = this.assets.length;
            } else {
                this.filter.pageSize = option;
            }
            this.filter.pageIndex = 1;
        },

        /* Toggle chọn kích cỡ trang
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        toggleSelectPageSize() {
            this.showPageSize = !this.showPageSize;
        },       

        /* Search keyword
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        searchKeyword() {

        },

        /* Số phân trang
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        setPages () {
			let numberOfPages = Math.ceil(this.assets.length / this.filter.pageSize);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},

        /* Số phân trang
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        paginate () {
			let page = this.page;
			let perPage = this.filter.pageSize;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  this.assets.slice(from, to);
		},

        /**
         * Về trang trước
         * NDDAT (25/09/2022)
         */
        prevPage() {
            if(this.filter.pageIndex > 1){
                this.filter.pageIndex--;
            }  
        },

        /**
         * Sang trang sau
         * NDDAT (25/09/2022)
         */
        nextPage() {
            if(this.filter.pageIndex < this.filter.totalPage){
                this.filter.pageIndex++;
            }    
        },

        /**
         * Tới trang được chọn
         * NDDAT (25/09/2022)
         * @param {int} page số trang
         */
        toPage(page) {
            this.page = page
        },

        setTotalPageIndex() {
            if(this.assetsFilterNoLimit.length <= this.filter.pageSize || this.filter.pageSize == -1) 
                this.assetsFilterNoLimit.totalPage = 1;
            else if(this.assetsFilterNoLimit.length % this.filter.pageSize == 0)
                this.filter.totalPage = this.assetsFilterNoLimit.length / this.filter.pageSize;
            else 
                this.filter.totalPage =  (this.assetsFilterNoLimit.length - (this.assetsFilterNoLimit.length % this.filter.pageSize)) / this.filter.pageSize + 1;
        },
        //#endregion Table

        //#region Chức năng 
        /* Đổi màu delete button khi không có bản ghi
            @param {}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        deleteDisable() {
            if(this.selectedFixedAssetById.length == 0) {
                this.function.delete.empty = true;
            } else {
                this.function.delete.empty = false;
            }
        },
        //#endregion Chức năng
    },

    data() {
        return {
            pickerVisible: false,

            //#region Data Table

            assets: [],
            assetsFilter: [],
            assetsFilterNoLimit: [],
            //#region Data table filter
            filter: {
                keyword: "",
                departmentId: "",
                fixedAssetCategoryId: "",
                pageIndex: 1, // Trang đang chọn
                pageSize: 20,  // Số dòng trong 1 trang
                totalPage: 0, // Tổng số trang
            },
            //#endregion Data table filter

            //#region Data table pagination
            showPageSize: false,
            pageSizes: [20, 50, 100, 'All'],
            //#endregion table pagination
            selectedFixedAssetById: [],

            categories: [],

            departments: [],

            function: {
                delete: {
                    empty: false,
                    a: false,
                    multi: false,
                    quantity: '',
                    fixedAssetCode: '',
                    fixedAssetName: '',
                },
            },

            /* BEGIN: Data loại tài sản */
            category: {
                showFilter: false,
                showModal: false,
                filter: 'Loại tài sản',
                value: {
                    code: null,
                    name: null,
                }
            },
            /* END: Data loại tài sản */

            /* BEGIN: Data bộ phận sử dụng */
            department: {
                showFilter: false,
                showModal: false,
                filter: 'Bộ phận sử dụng',
            },
            /* END: Data bộ phận sử dụng */
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
                depreciation_rate: 0,
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
            htmlToastSuccess: "",

            /* Hiển thị lỗi cảnh báo input */
            htmlError: "",

            /* Danh sách năm */
            years: [],

            checkfixedAssetName: {
                hasError: false
            },
            checkDepartmentCode: {
                hasError: false
            },
            checkFixedAssetCategoryCode: {
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
                @returns this.assets ? this.selectedFixedAssetById.length == this.assets.length : false;
            */
            get: function () {
                return this.assetsFilter ? this.selectedFixedAssetById.length == this.assetsFilter.length : false;
            },
            /*
                @param {fixed_asset_id}
                @returns void
            */
            set: function (value) {
                var selectedFixedAssetById = [];

                if (value) {
                    
                    this.assetsFilter.forEach(function (asset) {
                        selectedFixedAssetById.push(asset.fixed_asset_id);
                    });
                }

                this.selectedFixedAssetById = selectedFixedAssetById;
            }
        },

    },





}
</script>

<style scoped>





</style>