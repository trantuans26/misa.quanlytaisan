<template>
    <div class="content">
        <!-- Begin: Function -->
        <div class="function">
            <div class="function__list">
                <div class="function__item function__item--search function__item--maright">
                    <div class="function__icon" @click="searchKeyword()"> 
                        <i class="icon icon--search"></i>
                    </div>
                    
                    <input class="input input--search" 
                        v-on:keyup.enter="searchKeyword()"
                        v-model.trim="this.filter.keyword" 
                        type="text" 
                        placeholder="Tìm kiếm tài sản"
                    >
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
                <button class="btn btn__add function__item--maleft" @click="openModal(), this.titleModal = 'Thêm tài sản'">+ Thêm tài sản</button>

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
        <!-- END: Function -->

        <!-- Begin: Table -->  
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

            <div class="table__content" :class="{'table__content--empty': this.assetsNoLimit.length == 0}">
                <div class="" v-show="this.assetsNoLimit.length == 0">
                    <i class="icon--tableEmpty"></i>
                </div>
                <table v-show="this.assetsNoLimit.length != 0">
                    <tbody>
                        <tr 
                            class="table__row" 
                            v-for="(asset,index) in this.assets"
                            :key="asset"
                            :class="{'table__row--checked': checkBackground(asset.fixed_asset_id)}"
                            @click="doubleClickRow(asset.fixed_asset_id)"
                            @dblclick= "
                                            openModal(),
                                            editAsset (
                                                asset.fixed_asset_id, asset.fixed_asset_code, asset.fixed_asset_name, 
                                                asset.department_id, asset.department_code, asset.department_name, 
                                                asset.fixed_asset_category_id, asset.fixed_asset_category_code, asset.fixed_asset_category_name,
                                                asset.quantity, asset.cost, asset.life_time,
                                                asset.depreciation_rate, asset.depreciation_rate/100 * asset.cost, asset.tracked_year,
                                                formatDate(asset.purchase_date)
                                            )
                                        "
                        >
                            <td class="table__col--left table__col--check">
                               <input type="checkbox" v-model='selectedFixedAssetByIds' :value="asset.fixed_asset_id">
                            </td>
                            <td class="table__col--center table__col--serial">{{((this.filter.pageIndex - 1) * this.filter.pageSize) + (index + 1)}}</td>
                            <td class="table__col--left table__col--assetcode">{{asset.fixed_asset_code}}</td>
                            <td class="table__col--left table__col--assetname">{{asset.fixed_asset_name}}</td>
                            <td class="table__col--left table__col--category">{{asset.fixed_asset_category_name}}</td>
                            <td class="table__col--left table__col--department">{{asset.department_name}}</td>
                            <td class="table__col--right table__col--quantity">{{asset.quantity}}</td>
                            <td class="table__col--right table__col--cost">{{this.formatCostType(asset.cost)}}</td>
                            <td class="table__col--right tabel__col--depreciation">{{this.formatCostType(asset.depreciation_rate/100 * asset.cost)}}</td>
                            <td class="table__col--right table__col--residual">{{this.formatCostType(asset.cost - (asset.depreciation_rate/100 * asset.cost))}}</td>
                            <td class="table__col--right table__col--function">
                                <div class="table__function">
                                    <div 
                                        class="table__icon js-open-modal" 
                                        data-title="Sửa tài sản" 
                                        @click= "
                                            openModal(),
                                            editAsset (
                                                asset.fixed_asset_id, asset.fixed_asset_code, asset.fixed_asset_name, 
                                                asset.department_id, asset.department_code, asset.department_name, 
                                                asset.fixed_asset_category_id, asset.fixed_asset_category_code, asset.fixed_asset_category_name,
                                                asset.quantity, asset.cost, asset.life_time,
                                                asset.depreciation_rate, asset.depreciation_rate/100 * asset.cost, asset.tracked_year,
                                                formatDate(asset.purchase_date)
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
                                    <div class="table__sum">Tổng số: <b>{{this.totalAllAssets}} bản ghi</b></div>
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
                                                    @click="selectPageSize(item)"
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
                                            <div class="pagination__subitem"
                                                v-show="this.filter.pageIndex > 1"
                                                @click="this.filter.pageIndex = 1, this.loadAPI()"
                                            >1</div>

                                            <div class="pagination__subitem" 
                                                @click="this.filter.pageIndex -= 1, this.loadAPI()" 
                                                v-show="this.filter.pageIndex > 2"
                                            >{{this.filter.pageIndex - 1}}</div>

                                            <div class="pagination__subitem pagination__subitem--selected"><b>{{this.filter.pageIndex}}</b></div>

                                            <div class="pagination__subitem" 
                                                v-show="this.filter.pageIndex < 24 && this.filter.totalPage != 1 && this.filter.totalPage != this.filter.pageIndex"
                                                @click="this.filter.pageIndex += 1, this.loadAPI()">{{this.filter.pageIndex + 1}}</div>
                                        
                                            <div class="pagination__subitem"
                                                v-show="this.filter.totalPage != 1  && this.filter.pageIndex != 25 && (this.filter.pageIndex+1) < this.filter.totalPage"
                                                @click="this.filter.pageIndex = this.filter.totalPage, this.loadAPI()"
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
                            <td class="table__col--right table__col--quantity" v-show="this.assetsNoLimit != 0">
                                {{formatCostType(sumQuantity())}}
                            </td>
                            <td class="table__col--right table__col--cost" v-show="this.assetsNoLimit != 0">
                                {{formatCostType(sumCost())}}
                            </td>
                            <td class="table__col--right tabel__col--depreciation" v-show="this.assetsNoLimit != 0">
                                {{formatCostType(sumDepreciation())}}
                            </td>
                            <td class="table__col--right table__col--residual" v-show="this.assetsNoLimit != 0">
                                {{formatCostType(sumCost() - sumDepreciation())}}
                            </td>
                            <td class="table-col--right table__col--function" v-show="this.assetsNoLimit != 0">
                                
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <!-- END: Table -->

        <TheDelete/>
    </div>

    <!-- Begin: Modal -->
    <div class="modal" :class="{'modal--open': displayModal}">
        <form class="modal__main"  @submit.prevent="onSubmit()">

            <div class="modal__section modal__close" @click="closeModal()">
                <i class="icon icon--close"></i>
            </div>

            <header class="modal__section modal__header">
                {{this.titleModal}}
            </header>

            <!-- Begin: Modal body -->
            <div class="modal__section modal__content">
                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">{{this.textFixedAssetCode}} <em>*</em></label>
                        <input class="input input--modal" 
                            ref="focusMe" 
                            v-model.trim="assetModal.fixedAssetCode" 
                            :class="{'input--error': !this.assetModal.fixedAssetCode && this.isSubmited}"
                            type="text" 
                        placeholder="Nhập mã tài sản">
                        <base-message-error text="Mã tài sản"></base-message-error>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            {{this.textFixedAssetName}} <em>*</em>
                        </label>
                        <input
                            v-model.trim="assetModal.fixedAssetName" 
                            :class="{'input--error': !this.assetModal.fixedAssetName && this.isSubmited}"
                            class="input input--modal" type="text"  
                        placeholder="Nhập tên tài sản">
                        <base-message-error text="Tên tài sản"></base-message-error>
                    </div>
                </div>
                
                <!-- Bộ phận sử dụng -->
                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textDepartmentCode}} <em>*</em>
                        </label>
                        <div class="modal__input--icon"
                            @click="this.department.showModal = !this.department.showModal"
                        >
                            <input 
                                v-model.trim="assetModal.departmentCode"  
                                :class="{'input--error': !this.assetModal.departmentCode && this.isSubmited}"
                                class="input input--haveicon input--modal" type="text"  
                                placeholder="Chọn mã bộ phận sử dụng"
                                @blur="hideDepartmentModal()"
                            >
                            <base-message-error text="Mã bộ phận sử dụng"></base-message-error>
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
                                        :class="{'drilldown__item--selected': department.department_id == this.assetModal.departmentId}"
                                        v-for='department in this.departments'
                                        tabindex="0"
                                        @click="selectValueDepartment(department)"
                                        :key="department.department_id"
                                        v-on:change.enter="selectValueDepartment(department), this.department.show = false"
                                    >
                                        <div class="drilldown__id">{{department.department_code}}</div>
                                        <div class="drilldown__name">{{department.department_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            {{this.textDepartmentName}}
                        </label>
                        <input v-model.trim="assetModal.departmentName" class="input input--disable input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <!-- Loại tài sản -->
                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Mã loại tài sản <em>*</em>
                        </label>
                        <div class="modal__input--icon"
                            @click="this.category.showModal = !this.category.showModal"
                        >
                            <input 
                                v-model.trim="this.assetModal.categoryCode"  
                                :class="{'input--error': !this.assetModal.categoryCode && this.isSubmited}" 
                                class="input input--haveicon input--modal" 
                                type="text"  
                                placeholder="Chọn mã loại tài sản"
                                @blur="hideCategoryModal()"
                            >
                            <base-message-error text="Mã loại tài sản"></base-message-error>
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
                                        :class="{'drilldown__item--selected': category.fixed_asset_category_id == this.assetModal.categoryId}"
                                        v-for='category in this.categories'
                                        @click="selectValueCategory(category)"
                                        :key="category.fixed_asset_category_id"
                                    >
                                        <div class="drilldown__id">{{category.fixed_asset_category_code}}</div>
                                        <div class="drilldown__name">{{category.fixed_asset_category_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên loại tài sản 
                        </label>
                        <input 
                            v-model.trim="assetModal.categoryName" 
                            class="input input--disable input--modal" 
                        type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textQuantity}} <em>*</em>
                        </label>
                        <div class="modal__input--icon modal__input--quantity">
                            <input 
                                v-model.trim="quantityFormat" 
                                class="input input--quantity input--haveicon input--textright input--modal" 
                                :class="{'input--error': !this.assetModal.quantity && this.isSubmited}" 
                                ref="input" 
                                type="text"
                                maxlength="3"
                                @keypress="this.numbersOnly"                       
                            >
                            <base-message-error text="Số lượng"></base-message-error>
                            <i class="icon icon--multidrop"></i>
                            <span class="spin spin--up" @mousedown="this.increaseQuantity()"></span>
                            <span class="spin spin--down" @mousedown="this.decreaseQuantity()"></span>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textCost}} <em>*</em>
                        </label>
                        <input class="input input--textright input__spin--hide input--modal" 
                            :class="{'input--error': !this.assetModal.cost && this.isSubmited}" 
                            ref="Cost"
                            type="text"  
                            v-model="costFormat"
                            @keypress="validate($event)"                       

                        >
                        <base-message-error text="Nguyên giá"></base-message-error>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textLifeTime}} <em>*</em>
                        </label>
                        <input 
                            v-model.trim="lifeTimeFormat" 
                            class="input input--textright input__spin--hide input--modal" 
                            :class="{'input--error': !this.assetModal.lifeTime && this.isSubmited}" 
                            v-on:keypress="this.numbersOnly"
                            ref="input"
                            type="text"
                            maxlength="2"
                        >
                        <base-message-error text="Số năm sử dụng"></base-message-error>
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textDepreciationRate}} <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input class="input input--haveicon input--textright input__spin--hide input--modal" 
                                :class="{'input--error': !this.assetModal.depreciationRate && this.isSubmited}" 
                                ref="DepreciationRate"
                                type="text"
                                v-model="depreciationRateFormat"   
                                @keypress="onlyNumbers, this.validate($event, 1)"
                                @keyup="this.assetModal.depreciationRate > 100 ? this.assetModal.depreciationRate = 99 : false"
                                maxlength="5"
                            >
                            <base-message-error text="Tỷ lệ hao mòn"></base-message-error>
                            <i class="icon icon--multidrop"></i>
                            <span class="spin spin--up" @mousedown="increaseDepreciationRate()"></span>
                            <span class="spin spin--down" @mousedown="decreaseDepreciationRate()"></span>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textDepreciationYear}} <em>*</em>
                        </label>
                        <input 
                            :value="UpdateDepreciationYear()"
                            class="input input--textright input--disable input--modal" 
                            ref="input" 
                            type="text"
                            tabindex="-1"
                        >
                    </div>
     
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textTrackedYear}}
                        </label>
                        <input v-model.trim="assetModal.trackedYear" class="input input--disable input--textright input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textPurchaseDate}} <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                type="date" 
                                class="input input--modal" 
                                v-model.trim="assetModal.purchaseDate"
                            >
                            <i class="icon icon--date"></i>
                        </div>
                        <base-message-error text="Ngày mua"></base-message-error>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            {{this.textProductionDate}} <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input type="date" class="input input--modal" v-model.trim="assetModal.productionYear">
                            <i class="icon icon--date"></i>
                        </div>
                        <base-message-error text="Ngày bắt đầu sử dụng"></base-message-error>
                    </div>
                </div>
            </div>
            <!-- END: Modal body -->

            <!-- Begin: Modal footer -->
            <footer class="modal__section modal__footer">
                <button type="submit" class="btn btn__save btn__save--space">Lưu</button>
                <div tabindex="0" type="cancel" @click="closeModal()" class="btn btn__cancel" >Hủy</div> 
                <button v-on:focus="tabRollback()" class="btn__tabRollback"></button>
            </footer>
            <!-- END: Modal footer -->
        </form>

        <!-- Begin: Alert modal -->
        <div class="alert__box" :class="{'alert__box--open': isDisplayAlert}">
            <div class="alert__content">
                <div class="alert__body">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title">Bạn có muốn huỷ bỏ khai báo tài sản này?</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__outline" @click="closeAlertCancel()">Không</button>
                    <button class="btn btn__save alert__button--space" @click="acceptAlertCancel()">Huỷ bỏ</button>
                </div>
            </div>
        </div>

        <div class="alert__box" :class="{'alert__box--open': validateShow}">
            <div class="alert__content alert__content--validate">
                <div class="alert__body alert__body--validate" :style="{height: this.heightAlertValidate + 'px'}">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title alert__title--validate" v-html="this.errorMessage"></div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__save alert__button--space" @click="validateShow = false, focusFirst()">Đóng</button>
                </div>
            </div>
        </div>  

        <div class="alert__box" :class="{'alert__box--open': validateBackendShow}">
            <div class="alert__content">
                <div class="alert__body">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title">{{this.textExceptionMsg}}</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__save alert__button--space" @click="validateBackendShow = false, focusFirst()">Đóng</button>
                </div>
            </div>
        </div>  
        <!-- END: Alert modal -->

        <!-- Begin: Success toast modal -->
        <div id="toast__box" v-html="htmlToastSaveSuccess">
        </div>
        <!-- END: Success toast modal -->
    </div>
    <!-- END: Modal -->

    <TheLoading v-show="isDisplayLoading" />

    <!-- Begin: Success toast modal -->
    <div id="toast__box" v-html="htmlToastDeleteSuccess">
    </div>
    <!-- END: Success toast modal -->

</template>

<script>
import axios from "axios";
import Resource from "@/lib/resource";
import TheDelete from "@/components/function/TheDelete.vue";
import moment from 'moment'
import Enum from "../../lib/enum.js";
import useValidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import TheLoading from "@/components/base/loading/TheLoading.vue";
import BaseMessageError from "@/components/base/message/BaseMessageError.vue";
/* import BaseInput from "@/components/base/input/BaseInput.vue"; */

export default {
    name: "AssetList",
    components: {
        TheDelete,
        TheLoading,
        BaseMessageError,
/*         BaseInput, */
    },

    // Chưa truy cập vào data
    beforeCreate() {
    },

    // Truy cập vào data nhưng chưa vào DOM
    created() {
        try {
            this.isDisplayLoading = true; // Hiển thị loading data

            axios.get(`${Resource.Url.FixedAssetCategories}`)
            .then((resource) => {
                this.categories = resource.data;
            })
            .catch((error) => {
                console.log('error' + error.status);
            });

            axios.get(`${Resource.Url.Departments}`)
            .then((resource) => {
                this.departments = resource.data;
            })
            .catch((error) => {
                console.log('error' + error.status);
            });

            this.loadAPI(); 
        } catch (error) {
            console.log(error);
        }
    },
    
    /* Khởi tạo giá trị mặc định khi vào DOM thật */
    beforeMount() {
    },

    /* DOM thật */
    Mounted() {

    },

    beforeUpdate() {
        this.heightAlertValidate = this.errorArray.length * 28;
    },

    updated() {
        this.deleteDisable();
        
        console.log('Date');
        console.log(new Date());
        console.log('Date convert');
        console.log(new Date().toISOString().substring(0,10));
    },

    beforeUnmount() {
        
    },

    unmounted() {
        console.log('unmounted');
    },

    directives: {
    },

    methods: {
        /* Tải dữ liệu API
            @param {}
            @returns void
            Author: Tuan 
            Date: 30/10/2022 
        */
        loadAPI() {
/*             this.isDisplayLoading = true; */
            try {
                // Sử dụng axios get all data
                axios
                .get(`${Resource.Url.FixedAssets}`)
                .then((resource) => {
                     // Lấy tổng số bản ghi
                    console.log(resource);
                    setTimeout(() => this.isDisplayLoading = false, 500); // Ẩn loading data
                })
                .catch((error) => {
                    console.log('error' + error.status);
                });

                // Lấy dữ liệu filter 
                axios
                .get(`${Resource.Url.FixedAssets}/filter?keyword=${this.filter.keyword}&fixedAssetCategoryId=${this.filter.fixedAssetCategoryId}&departmentId=${this.filter.departmentId}&pageSize=600&pageIndex=1`)
                .then((resource) => {
                    this.updateTotalPageIndex(resource.data.length);
                    this.assetsNoLimit = resource.data;
                    this.totalAllAssets = resource.data.length;
                })
                .catch((error) => {
                    console.log('error' + error.status);
                });

                // Lấy dữ liệu filter and paging
                axios
                .get(`${Resource.Url.FixedAssets}/filter?keyword=${this.filter.keyword}&fixedAssetCategoryId=${this.filter.fixedAssetCategoryId}&departmentId=${this.filter.departmentId}&pageSize=${this.filter.pageSize}&pageIndex=${this.filter.pageIndex}`)
                .then((resource) => {
                    this.assets = resource.data;
                })
                .catch((error) => {
                    console.log('error' + error.status);
                });
            } catch (e) {
                console.log(e);
            }
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
            this.loadAPI();
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
            if(option.fixed_asset_category_id == this.assetModal.categoryId) {
                this.assetModal.categoryId = '';
                this.assetModal.categoryCode = ''
                this.assetModal.categoryName = ''
            } else {
                this.assetModal.categoryId = option.fixed_asset_category_id;
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
            this.loadAPI();
        },

        /* Đưa phòng ban vào input modal
            @param {option} giá trị đc chọn trong vòng lặp for
            @returns void
            Author: Tuan 
            Modified Date: 4/11/2022 
        */
        selectValueDepartment(option) {
            if(option.department_id == this.assetModal.departmentId) {
                this.assetModal.departmentId = '';
                this.assetModal.departmentCode = '';
                this.assetModal.departmentName = '';
            } else {
                this.assetModal.departmentId = option.department_id;
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

        //#region Method Modal 
        /* Sửa 1 tài sản
            @param {}
            @returns void
            Author: Tuan 
            Date: 17/11/2022 
        */
        updateFixedAsset() {
            try {                                   
                axios
                .put(`${Resource.Url.FixedAssets}/${this.assetModal.fixedAssetId}`, {
                    "fixed_asset_code": this.assetModal.fixedAssetCode,
                    "fixed_asset_name": this.assetModal.fixedAssetName,
                    "organization_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "organization_code": "ORG0008",
                    "organization_name": "MISA Corp",
                    "department_id": this.assetModal.departmentId,
                    "department_code": this.assetModal.departmentCode,
                    "department_name": this.assetModal.departmentName,
                    "fixed_asset_category_id": this.assetModal.categoryId,
                    "fixed_asset_category_code": this.assetModal.categoryCode,
                    "fixed_asset_category_name": this.assetModal.categoryName,
                    "purchase_date": this.assetModal.purchaseDate,
                    "cost": 82452889.1186,
                    "quantity": this.assetModal.quantity,
                    "depreciation_rate": 8.6,
                    "tracked_year": this.assetModal.trackedYear,
                    "life_time": this.assetModal.lifeTime,
                    "production_year": this.assetModal.trackedYear,
                    "active": 0
                })
                .then(() => {
                    // Close modal 

                    // Reload data
                    this.loadAPI();

                    // Display success toast message 
                    this.showSuccessToast();
                })
                .catch((error) => {
                    var status = error.response.status;
                    this.handleException(status);
                });
            } catch (error) {
                console.log(error);
            }
        },

        /* Thêm 1 tài sản
            @param {}
            @returns void
            Author: Tuan 
            Date: 17/11/2022 
        */
        insertFixedAsset() {
            try {
                axios
                .post(Resource.Url.FixedAssets, {
                    "fixed_asset_code": this.assetModal.fixedAssetCode,
                    "fixed_asset_name": this.assetModal.fixedAssetName,
                    "department_id": this.assetModal.departmentId,
                    "department_code": this.assetModal.departmentCode,
                    "department_name": this.assetModal.departmentName,
                    "fixed_asset_category_id": this.assetModal.categoryId,
                    "fixed_asset_category_code": this.assetModal.categoryCode,
                    "fixed_asset_category_name": this.assetModal.categoryName,
/*                     "purchase_date": new Date().toISOString().substring(0,10), */
                    "purchase_date": this.assetModal.purchaseDate,
                    "cost": 82452889.1186,
/*                     "cost": this.assetModal.cost.replace(/[^0-9]/g, ''), */
                    "quantity": this.assetModal.quantity,
                    "depreciation_rate": 8.6,
/*                     "depreciation_rate": parseFloat(this.assetModal.depreciationRate.replace(',', '.')), */
                    "tracked_year": this.assetModal.trackedYear,
                    "life_time": this.assetModal.lifeTime,
                    "production_year": this.assetModal.trackedYear,
                    "active": 0
                })
                .then(() => {
                    /* Close modal */
                    // Reload data
                    this.loadAPI();

                    // Display success toast message 
                    this.showSuccessToast();
                })
                .catch((error) => {
                    var status = error.response.status;
                    this.handleException(status);
                });
            } catch (error) {
                console.log(error);
            }
        },
        //#region Modal click events 
        /* Tab rollback về mã tài sản
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        tabRollback() {
            this.focusFirst();
        },

        /* Focus ô input đầu tiên
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        focusFirst() {
            setTimeout(() => {
                this.$refs.focusMe.focus();
            }, 1);
        },

        /* Mở modal
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        openModal() {
            this.displayModal = true;
            this.assetModal.fixedAssetCode += parseInt(Math.random()*112345);
            this.focusFirst();
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
            this.isDisplayAlert = true;
        },

        /* Đồng ý cảnh báo huỷ
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        acceptAlertCancel() {
            this.isSubmited = false;
            this.displayModal = false;
            this.isDisplayAlert = false;
            this.htmlToastSaveSuccess = "",
            this.htmlError = "",
            this.checkfixedAssetName.hasError = false,
            this.checkDepartmentCode.hasError = false,
            this.checkFixedAssetCategoryCode.hasError = false,
            this.assetModal = {
                fixedAssetCode: 'TS' + parseInt(Math.random()*112345),
                fixedAssetName: '',
                departmentCode: '',
                departmentName: '',
                categoryCode: '',
                categoryName: '',
                quantity: '',
                cost: '',
                lifeTime: '',
                depreciationRate: '',
                depreciation: 0,
                trackedYear: new Date().getFullYear(),
                purchaseDate: new Date().toISOString().substring(0,10),
                productionYear: new Date().toISOString().substring(0,10)
            }
        },

        /* Không đồng ý huỷ
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        closeAlertCancel() {
            this.isDisplayAlert = false;
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
            if (this.titleModal == 'Thêm tài sản')
                this.htmlToastSaveSuccess = "<div class='toast__item'><div class='toast__icon'><i class='icon icon--success'></i></div><div class='toast__text'>Lưu dữ liệu thành công</div></div>"
            else if(this.titleModal == 'Sửa tài sản')
                this.htmlToastSaveSuccess = "<div class='toast__item'><div class='toast__icon'><i class='icon icon--success'></i></div><div class='toast__text'>Sửa dữ liệu thành công</div></div>"
        },

        /* Hiển thị thông báo thêm dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        showSuccessToast() {
            this.addHTMLToast();
                setTimeout(() => this.htmlToastSaveSuccess = "", 5000)
        },

        /* Check dữ liệu khi lưu
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        onSubmit() {
            this.isSubmited = true;
            try {
                if (this.titleModal == 'Thêm tài sản') {
                    if(this.validateData()) {
                        this.isSubmited = false;
                        this.insertFixedAsset();
                        this.assetModal = {
                            fixedAssetCode: 'TS' + parseInt(Math.random()*112345),
                            fixedAssetName: '',
                            departmentCode: '',
                            departmentName: '',
                            categoryCode: '',
                            categoryName: '',
                            quantity: '',
                            cost: '',
                            depreciationRate: '',
                            depreciation: '',
                            lifeTime: '',
                            trackedYear: new Date().getFullYear(),
                            purchaseDate: new Date().toISOString().substring(0,10),
                            productionYear: new Date().getFullYear(),
                        }
                    }
                } else if(this.titleModal == 'Sửa tài sản') {
                    if(this.validateDataUpdate()) {
                        this.isSubmited = false;
                        this.updateFixedAsset();
                        this.assetModal = {
                            fixedAssetId: '',
                            fixedAssetCode: 'TS' + parseInt(Math.random()*112345),
                            fixedAssetName: '',
                            departmentCode: '',
                            departmentName: '',
                            categoryCode: '',
                            categoryName: '',
                            quantity: '',
                            cost: '',
                            depreciationRate: '',
                            depreciation: 0,
                            lifeTime: '',
                            trackedYear: new Date().getFullYear(),
                            purchaseDate: new Date().toISOString().substring(0,10),
                            productionYear: new Date().getFullYear(),
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        //#endregion Modal processing ui

        //#region Modal processing data
        /* Tăng số lượng
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        increaseQuantity() {
            try {
                if(this.assetModal.quantity < 100)
                this.assetModal.quantity++;
            } catch (error) {
                console.log(error);
            }
        },

        /* Giảm số lượng
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        decreaseQuantity() {
            try {
                if(this.assetModal.quantity > 0)
                    this.assetModal.quantity--;
            } catch (error) {
                console.log(error);
            }
        },

        /* Tăng tỷ lệ hao mòn
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        increaseDepreciationRate() {
            try {
                if (this.assetModal.depreciationRate == '' || this.assetModal.depreciationRate == null || this.assetModal.depreciationRate == '0') this.assetModal.depreciationRate = 0;
                if(this.assetModal.depreciationRate < 100) {
                    this.assetModal.depreciationRate = parseFloat(this.assetModal.depreciationRate) + 1
                }
            } catch (error) {
                console.log(error);
            }
        },

        /* Giảm tỷ lệ hao mòn
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        decreaseDepreciationRate() {
            try {
                if(this.assetModal.depreciationRate >= 1) {
                    this.assetModal.depreciationRate = parseFloat(this.assetModal.depreciationRate) - 1
                }
            } catch (error) {
                console.log(error);
            }
        },
        //#endregion Modal processing data

        //#region Modal format support
        /* handler key number
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
         */
         validate(evt, type) {
        var regex = /[0-9]/g;
        if (type) {
            regex = /[0-9|,]/g;
        }
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === "paste") {
            key = event.clipboardData.getData("text/plain");
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
        },

           /**
         * format tiền
         */
         formatCurrency(value) {
            if (value == null || value == 0 || value == "") return "0";
            let num = this.formatNum(value + "") + "";
            return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        formatDecimal(value) {
            if (value == null || value == 0 || value == "") return "0";
            value = value.replace(/[^0-9-|,]+/g, "");
            if (value.charAt(0) === "0" && value.charAt(1) !== ",") {
                return this.formatDecimal(value.slice(1) + "");
            }
            let count = 0;
            for (let i = 0; i < value.length; i++) {
                if (value.charAt(i) === ",") {
                count++;
                if (count > 1) {
                    value = value.slice(0, i) + value.slice(i + 1);
                    return this.formatDecimal(value + "");
                }
                }
            }
            let num = value;
            return num;
        },

        /**
         * reset text
         */
/*         focusSelected(refName) {
        if (refName == "DepartmentId" || refName == "FixedAssetCategoryId") {
            this.$refs[refName].$el.querySelector(".dx-texteditor-input").select();
        } else {
            this.$refs[refName].select();
        }
    }, */

        formatNum(value) {
            if (value == null || value == 0 || value == "") return "0";
            let num = value.replace(/[^0-9-]+/g, "");
            return parseInt(num);
        },

        setDepreciationYear() {
            let tmpDR = this.assetModal.depreciationRate + "";
            tmpDR = tmpDR.replaceAll(",", ".");
            this.assetModal.depreciation = (
                0.01 *
                this.formatNum(this.assetModal.Cost + "") *
                parseFloat(tmpDR)
            ).toFixed(0);
            this.assetModal.depreciation = this.formatCurrency(
                this.assetModal.depreciation + ""
            );
        },
        
        /* Định dạng dữ liệu cho giá (200000 => 200.000)
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        formatCostType(number) {
            let val = (number/1).toFixed(0).replace('.', ',')
            if (number && !isNaN(number)) {
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
        formatRateType(number) {
            let val = (number/1).toFixed(2).replace('.', ',')
            if (number && !isNaN(number)) {
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            } else 
                return number;
        },

        //#endregion Modal format support

        //#region Modal validate data
        /* Tạo thông điệp cho cảnh báo lỗi
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */       
        createValidateMessage() {
            this.errorMessage = "";
            let i = 0;
            while(i < this.errorArray.length) {
                this.errorMessage = `${this.errorMessage} </br> - ${this.errorArray[i]}`;
                i++;
            }
        },

        /* Validate dữ liệu truyền vào
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        validateData() {
            let check;
            for (var i = 0; i < this.assetsNoLimit.length; i++) {
                if(this.assetModal.fixedAssetCode == this.assetsNoLimit[i].fixed_asset_code)
                    check = true;
            }

            this.v$.$validate()
            if (this.v$.$error) {
                this.errorArray = []
                if (check) this.errorArray.push(Resource.ErrorMsg.ValidateDuplicateCode);
                if (this.v$.assetModal.fixedAssetCode.$error) this.errorArray.push(Resource.IsEmpty.code);
                if (this.v$.assetModal.fixedAssetName.$error) this.errorArray.push(Resource.IsEmpty.name);
                if (this.v$.assetModal.departmentCode.$error) this.errorArray.push(Resource.IsEmpty.department);
                if (this.v$.assetModal.categoryCode.$error) this.errorArray.push(Resource.IsEmpty.category);
                if (this.v$.assetModal.quantity.$error) this.errorArray.push(Resource.IsEmpty.quantity);
                if (this.v$.assetModal.cost.$error) this.errorArray.push(Resource.IsEmpty.cost);
                if (this.v$.assetModal.depreciationRate.$error) this.errorArray.push(Resource.IsEmpty.depreciation_rate);
                if (this.v$.assetModal.lifeTime.$error) this.errorArray.push(Resource.IsEmpty.life_time);
                this.createValidateMessage()
                this.validateShow = true
                return false;
            } else if(this.assetModal.depreciation > this.assetModal.cost) {
                this.errorMessage = Resource.ErrorMsg.DepreciationYearLessThanOrEqualToCost;
                this.validateShow = true;
                return false;
            } else if (this.assetModal.depreciationRate != parseFloat(0.01*this.assetModal.lifeTime).toFixed(2)) {
                this.errorMessage = Resource.ErrorMsg.DepreciationRateEqualToOneDevideLifeTime;
                this.validateShow = true;
                return false;
            } else {
                return true;
            } 
        },

        /* Validate dữ liệu truyền vào
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        validateDataUpdate() {
            this.v$.$validate()
            if (this.v$.$error) {
                this.errorArray = []
                if (this.v$.assetModal.fixedAssetCode.$error) this.errorArray.push(Resource.IsEmpty.code);
                if (this.v$.assetModal.fixedAssetName.$error) this.errorArray.push(Resource.IsEmpty.name);
                if (this.v$.assetModal.departmentCode.$error) this.errorArray.push(Resource.IsEmpty.department);
                if (this.v$.assetModal.categoryCode.$error) this.errorArray.push(Resource.IsEmpty.category);
                if (this.v$.assetModal.quantity.$error) this.errorArray.push(Resource.IsEmpty.quantity);
                if (this.v$.assetModal.cost.$error) this.errorArray.push(Resource.IsEmpty.cost);
                if (this.v$.assetModal.depreciationRate.$error) this.errorArray.push(Resource.IsEmpty.depreciation_rate);
                if (this.v$.assetModal.lifeTime.$error) this.errorArray.push(Resource.IsEmpty.life_time);
                this.createValidateMessage()
                this.validateShow = true
                return false;
            } else {
                return true;
            } 
        },
     
     
        /* Validate dữ liệu modal trống hoặc trùng mã
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        validateModal() {
/*             try {
                var check = false;
                for (var i = 0; i < this.assetsNoLimit.length; i++) {
                    if(this.assetModal.fixedAssetCode == this.assetsNoLimit[i].fixed_asset_code)
                        check = true;
                }

                if(check) {
                    this.isDisplayValidate = true;
                    this.textValidate = 'Mã tài sản đã tồn tại';
                }
                else if(!this.checkValidInputEmpty(this.assetModal.fixedAssetCode) ||
                    !this.checkValidInputEmpty(this.assetModal.fixedAssetName) ||
                    !this.checkValidInputEmpty(this.assetModal.departmentId) ||
                    !this.checkValidInputEmpty(this.assetModal.categoryId) ||
                    !this.checkValidInputEmpty(this.assetModal.quantity) ||
                    !this.checkValidInputEmpty(this.assetModal.cost) ||
                    !this.checkValidInputEmpty(this.assetModal.lifeTime) || 
                    !this.checkValidInputEmpty(this.assetModal.depreciationRate) 
                ) {
                    this.isDisplayValidate = true;
                    this.textValidate = 'Dữ liệu không được để trống';
                } else {
                    this.insertFixedAsset();

                    this.assetModal = {
                        fixedAssetCode: 'TS' + parseInt(Math.random()*112345),
                        fixedAssetName: '',
                        departmentCode: '',
                        departmentName: '',
                        categoryCode: '',
                        categoryName: '',
                        quantity: 0,
                        cost: 0,
                        depreciationRate: 0,
                        depreciation: 0,
                        lifeTime: 0,
                        trackedYear: new Date().getFullYear(),
                        purchaseDate: new Date().toISOString().substring(0,10),
                        productionYear: new Date().getFullYear(),
                    }
                }
            } catch (error) {
                console.log(error);
            } */
        },

        /* Validate input trống
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        checkValidInputEmpty(value) {
            try {
                if(value == undefined){
                    return false;
                }
                else if (value == null) {
                    return false;
                }
                else if(value == ""){
                    return false;
                }
                else {
                    return true;
                }
            } catch (error) {
                console.log(error);
            }
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

        /* Cập nhật giá trị hao mòn năm
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        UpdateDepreciationYear() {
            return parseInt(this.assetModal.depreciation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        //#endregion Modal validate input
        //#endregion Method Modal

        //#region Method Table 
        /* add html thêm dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        addHTMLDeleteToast() {
            this.htmlToastDeleteSuccess = " <div class='toast__item'><div class='toast__icon'><i class='icon icon--success'></i></div><div class='toast__text'>Xoá dữ liệu thành công</div></div>"
        },

        /* Hiển thị thông báo xoá dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        showDeleteSuccessToast() {
            this.addHTMLDeleteToast();
                setTimeout(() => this.htmlToastDeleteSuccess = "", 5000)
        },

        /* formatDate
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        formatDate(value){
            if (value) {
                console.log(value);
                console.log((moment(String(value)).format('YYYYMMDD')));
                return new Date().toISOString().substring(0,10);
            }
        },

        editAsset (
            fixedAssetId,fixedAssetCode, fixedAssetName, 
            departmentId, departmentCode, departmentName, 
            categoryId, categoryCode, categoryName,
            quantity, cost, lifeTime,
            depreciationRate, depreciation, trackedYear,
            purchaseDate
        ) {
            this.assetModal.fixedAssetId = fixedAssetId;
            this.assetModal.fixedAssetCode = fixedAssetCode;
            this.assetModal.fixedAssetName = fixedAssetName;
            this.assetModal.departmentId = departmentId;
            this.assetModal.departmentCode = departmentCode;
            this.assetModal.departmentName = departmentName;
            this.assetModal.categoryId = categoryId;
            this.assetModal.categoryCode = categoryCode;
            this.assetModal.categoryName = categoryName;
            this.assetModal.quantity = quantity;
            this.assetModal.cost = cost;
            this.assetModal.lifeTime = lifeTime;
            this.assetModal.depreciationRate = depreciationRate;
            this.assetModal.depreciation = depreciation;
            this.assetModal.trackedYear = trackedYear;
            this.assetModal.productionYear = purchaseDate;
            this.assetModal.purchaseDate = purchaseDate;
            this.titleModal = 'Sửa tài sản';
        },
        /* Sửa tài sản
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        showUpdateModal(asset) {
            this.titleModal = 'Sửa tài sản'
            for(var i = 0; i < this.assetsNoLimit.length; i++) {
                if(this.assetsNoLimit[i] == asset) {
                    this.assetModal.fixedAssetId = asset.fixed_asset_id;
                    this.assetModal.fixedAssetCode = asset.fixed_asset_code;
                    this.assetModal.fixedAssetName = asset.fixed_asset_name;
                    this.assetModal.departmentCode = asset.department_code;
                    this.assetModal.departmentName = asset.department_name;
                    this.assetModal.categoryCode = asset.fixed_asset_category_code;
                    this.assetModal.categoryName =  asset.fixed_asset_category_name;
                    this.assetModal.quantity = asset.quantity;
                    this.assetModal.cost = asset.cost;
                    this.assetModal.lifeTime = asset.life_time;
                    this.assetModal.depreciationRate = asset.depreciation_rate;
                    this.assetModal.depreciation = asset.depreciation_rate/100 * asset.cost;
                    this.assetModal.trackedYear = asset.tracked_year;
                    this.assetModal.productionYear = asset.purchase_date;
                    this.assetModal.purchaseDate = asset.purchase_dat;
                }
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
                if (asset.quantity == '' || asset.quantity == null || asset.quantity == undefined) {
                    sumQuantity = sumQuantity + 0;
                } else {
                    sumQuantity = sumQuantity + (asset.quantity);
                }
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
            if (this.selectedFixedAssetByIds.length < 10) {
                this.function.delete.quantity = '0' + this.selectedFixedAssetByIds.length;
            } else {
                this.function.delete.quantity = this.selectedFixedAssetByIds.length;
            }
        },

        /* Toggle show alert delete
            @param {}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        showAlertDelete() {
            if (this.selectedFixedAssetByIds.length == 1) {
                this.toggleAlertDeleteARecord();
                for (var i = 0; i < this.assets.length; i++) {
                    if (this.assets[i].fixed_asset_id == this.selectedFixedAssetByIds[0]) {
                        this.function.delete.fixedAssetCode = this.assets[i].fixed_asset_code;
                        this.function.delete.fixedAssetName = this.assets[i].fixed_asset_name;
                    }
                }
            } else if (this.selectedFixedAssetByIds.length > 1) {
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
            for(var i = 0; i < this.selectedFixedAssetByIds.length; i++) {
                if(id == this.selectedFixedAssetByIds[i]) {
                    this.selectedFixedAssetByIds.splice(i,1);
                    check = true;
                    break;
                }
            }

            if(!check) {
                this.selectedFixedAssetByIds.push(id);
            }
        },

        /* Binding css cho dòng được chọn
            @param {}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        checkBackground(id) {
            for(var i = 0; i < this.selectedFixedAssetByIds.length; i++) {
                if(id == this.selectedFixedAssetByIds[i]) {
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
            this.loadAPI();
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
            try {
                this.filter.keyword = this.filter.keyword.trim();
                this.loadAPI();
            } catch (e) {
                console.log(e);
            }

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

        /* Về trang trước
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        prevPage() {
            if(this.filter.pageIndex > 1){
                this.filter.pageIndex--;
                this.loadAPI();
            }  
        },

        /* Tới trang sau
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        nextPage() {
            if(this.filter.pageIndex < this.filter.totalPage){
                this.filter.pageIndex++;
                this.loadAPI();
            }    
        },

        /* Tới trang được chọn
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        toPage(page) {
            this.page = page
        },

        /*  Cập nhật tổng số trang
            @param {PageSize}
            @returns void
            Author: Tuan 
            Date: 7/11/2022 
        */
        updateTotalPageIndex(filterLength) {
            if(filterLength <= this.filter.pageSize || this.filter.pageSize == -1) 
                this.filter.totalPage = 1;
            else if(filterLength % this.filter.pageSize == 0)
                this.filter.totalPage = filterLength / this.filter.pageSize;
            else 
                this.filter.totalPage = ((filterLength - (filterLength % this.filter.pageSize)) / this.filter.pageSize) + 1;
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
            if(this.selectedFixedAssetByIds.length == 0) {
                this.function.delete.empty = true;
            } else {
                this.function.delete.empty = false;
            }
        },
        //#endregion Chức năng
    
        /*  Hàm xử lý exception gửi về từ backend hiện ra cho người dùng
            @param {int} status: trạng thái bên backend trả về
            @returns void
            Date: 21/11/2022 
         */
        handleException(status) {
            try {
                switch (status) {
                case Enum.StatusCode.BADREQUEST:
                    this.textExceptionMsg = Resource.ExceptionMsg.BADREQUEST;
                    break;
                case Enum.StatusCode.FORBIDDEN:
                    this.textExceptionMsg = Resource.ExceptionMsg.FORBIDDEN;
                    break;
                case Enum.StatusCode.NOTFOUND:
                    this.textExceptionMsg = Resource.ExceptionMsg.NOTFOUND;
                    break;
                case Enum.StatusCode.UNAUTHORIZED:
                    this.textExceptionMsg = Resource.ExceptionMsg.UNAUTHORIZED;
                    break;
                case Enum.StatusCode.NTERNALSERVERERROR:
                    this.textExceptionMsg = Resource.ExceptionMsg.NTERNALSERVERERROR;
                    break;
                }
                this.validateBackendShow = true;
            } catch (error) {
                console.log(error);
            }
        },
    },

    data() {
        return {
            isDisplayLoading: false, // Toggle loading khi load dữ liệu

            //#region Data Table
            htmlToastDeleteSuccess: '', // html thông báo xoá thành công
            totalAllAssets: 0, // Tổng số tài sản
            assets: [], // Danh sách tải sản filter và phân trang
            assetsNoLimit: [], // Danh sách tải sản filter
            //#region Data table filter
            filter: {
                keyword: "", // Từ khoá cần tìm kiếm
                departmentId: "", // Id phòng ban
                fixedAssetCategoryId: "", // Id loại tài sản
                pageIndex: 1, // Trang đang chọn
                pageSize: 20,  // Số dòng trong 1 trang
                totalPage: 0, // Tổng số trang
            },
            //#endregion Data table filter

            //#region Data table pagination
            showPageSize: false,
            pageSizes: [20, 50, 100, 200],
            //#endregion table pagination
            selectedFixedAssetByIds: [], // Danh sách Id tài sản được chọn trong table

            categories: [], // Danh sách loại tài sản

            departments: [], // Danh sách phòng ban

            function: { // Data chức năng xoá
                delete: {
                    empty: false, 
                    a: false,
                    multi: false,
                    quantity: '',
                    fixedAssetCode: '',
                    fixedAssetName: '',
                },
            },

            category: { // Data loại tài sản
                showFilter: false, // Show combobox lọc tài sản
                showModal: false, // Show combobox chọn tài sản trong modal
                filter: 'Loại tài sản', // Giá trị hiển thị trên filter
            },

            department: { // Data bộ phận sử dụng
                showFilter: false, // Show combobox lọc phòng ban
                showModal: false, // Show combobox chọn phòng ban trong modal
                filter: 'Bộ phận sử dụng', // Giá trị hiển thị trên filter
            },
            //#endregion Table

            //#region Data Modal 
            notifyShow: false, // Có hiển thị dialog cảnh báo hay không
            v$: useValidate(), // Validate dữ liệu (sử dụng vuelidate)
            heightAlertValidate: 1,
            errorArray: [], // Dãy chứa các lỗi validate
            errorMessage: "", // Thông điệp hiện trong dialog cảnh báo lỗi validate
            validateShow: false, // Có hiển thị dialog cảnh báo lỗi validate thiếu hay không
            validateProShow: false, // Có hiển thị dialog cảnh báo lỗi validate nghiệp vụ hay không
            validateBackendShow: false,
            hasError: false,
            displayModal: false, /* Hiển thị modal */
            isDisplayAlert: false, /* Hiển thị cảnh báo khi huỷ*/
            htmlToastSaveSuccess: "", /* Hiển thị thông báo lưu dữ liệu thành công */
            htmlError: "", /* Hiển thị lỗi cảnh báo input */
            isDisplayValidate: false, // Toggle thông báo validate dữ liệu
            textValidate: '', // Dữ liệu thông báo
            titleModal: '', // Chủ đề modal
            textFixedAssetCode: Resource.TextVi.Modal.FixedAssetCode,
            textFixedAssetName: Resource.TextVi.Modal.FixedAssetName,
            textDepartmentCode: Resource.TextVi.Modal.DepartmentCode,
            textDepartmentName: Resource.TextVi.Modal.DepartmentName,
            textFixedAssetCategoryCode: Resource.TextVi.Modal.FixedAssetCategoryCode,
            textFixedAssetCategoryName: Resource.TextVi.Modal.FixedAssetCategoryName,
            textQuantity: Resource.TextVi.Modal.Quantity,
            textCost: Resource.TextVi.Modal.Cost,
            textDepreciationRate: Resource.TextVi.Modal.DepreciationRate,
            textDepreciationYear: Resource.TextVi.Modal.DepreciationYear,
            textPurchaseDate: Resource.TextVi.Modal.PurchaseDate,
            textProductionDate: Resource.TextVi.Modal.ProductionDate,
            textLifeTime: Resource.TextVi.Modal.LifeTime,
            textTrackedYear: Resource.TextVi.Modal.TrackedYear,
            assetModal: { // Dữ liệu form modal
                fixedAssetId: '',
                fixedAssetCode: 'TS00001',
                fixedAssetName: '',
                departmentId: '',
                departmentCode: '',
                departmentName: '',
                categoryId: '',
                categoryCode: '',
                categoryName: '',
                quantity: '',
                cost: '',
                lifeTime: '',
                purchaseDate: new Date().toISOString().substring(0,10),
                depreciationRate: '',
                depreciation: 0,
                trackedYear: new Date().getFullYear(),
                productionYear: new Date().toISOString().substring(0,10),
            },
            //#endregion Data Modal

            //#region Fixing
            checkfixedAssetName: {
                hasError: false
            },
            checkDepartmentCode: {
                hasError: false
            },
            checkFixedAssetCategoryCode: {
                hasError: false
            },

            textExceptionMsg: "", // Thông điệp trong cảnh báo lỗi backend
            backendError: false, // Có hiển thị dialog cảnh báo lỗi từ backend không
            //#endregion Fixing
        }
    },

    validations: {
        // Các trường cần validate thiếu
        assetModal: { 
            fixedAssetCode: { required },
            fixedAssetName: { required },
            departmentCode: { required },
            categoryCode: { required },
            quantity: { required },
            cost: { required },
            depreciationRate: { required },
            lifeTime: { required }     
        },
    },

    computed: {
        /* Chọn tất cả dòng
            Object
            Author: Tuan 
            Date: 30/10/2022 
        */
        selectAll: {
            /*
                @param {}
                @returns this.assets ? this.selectedFixedAssetByIds.length == this.assets.length : false;
            */
            get: function () {
                if (this.assetsNoLimit.length != 0)
                    return this.assets ? this.selectedFixedAssetByIds.length == this.assets.length : false;
                else return false;
            },
            /*
                @param {fixed_asset_id}
                @returns void
            */
            set: function (value) {
                var selectedFixedAssetByIds = [];

                if (value) {
                    
                    this.assets.forEach(function (asset) {
                        selectedFixedAssetByIds.push(asset.fixed_asset_id);
                    });
                }

                this.selectedFixedAssetByIds = selectedFixedAssetByIds;
            }
        },

        // Thực hiện format trường Số lượng
        quantityFormat: {
            get: function() {
                if (this.assetModal.quantity == null || this.assetModal.quantity == 0 || this.assetModal.quantity == "") return 0;
                return this.assetModal.quantity;
            },
                // setter
            set: function(number) {
                number = this.formatNum(number);
                this.assetModal.quantity = number;
            }
        },

        // Thực hiện format trường Nguyên giá đồng thời tính lại giá trị hao mòn năm
        costFormat: {
            get: function() {
                if (this.assetModal.cost == null || this.assetModal.cost == 0 || this.assetModal.cost == "") return 0;
                return this.formatCurrency(parseInt(this.assetModal.cost));
            },
                // setter
            set: function(number) {
/*                 number = this.formatToInt(number); */    
                number = this.formatNum(number);
                this.assetModal.cost = number;
                if (this.assetModal.cost != 0 && this.assetModal.cost != null && this.assetModal.cost != '') {
                    this.assetModal.depreciation = (this.assetModal.depreciationRate*0.01 * this.assetModal.cost);
                    this.assetModal.depreciation = Math.floor(this.assetModal.depreciation);
                }
            }
        },

        // Thực hiện format trường số năm sử dụng
        lifeTimeFormat: {
            get: function() {
                if (this.assetModal.lifeTime == null || this.assetModal.lifeTime == 0 || this.assetModal.lifeTime == "") return 0;
                return this.assetModal.lifeTime;
            },
                // setter
            set: function(number) {
                this.assetModal.lifeTime = number;
            }
        },

        // Thực hiện format tỷ lệ hao mòn đồng thời tính lại giá trị hao mòn năm
        depreciationRateFormat: {
            get: function() {
                let rate = (this.assetModal.depreciationRate/1).toFixed(2).replaceAll('.', ',');
                if (rate == null || rate == '0' || rate == "") 
                    return "00,00";  
                return this.formatDecimal(rate);
            },

            set: function(number) {
                if (number == null || number == '' || number == "")
                    this.assetModal.depreciationRate = 0;
                else {
                    number = parseFloat(number.replaceAll(',', '.'));
                    this.assetModal.depreciationRate =  number;
                    if (this.assetModal.depreciationRate != 0 && this.assetModal.depreciationRate != '' && this.assetModal.depreciationRate != null) {
                        this.assetModal.depreciation = (this.assetModal.depreciationRate*0.01 * this.assetModal.cost);
                        this.assetModal.depreciation = Math.floor(this.assetModal.depreciation);
                    }
                }
            }
        },
    },
}
</script>

<style scoped>

</style>