import Vue from "vue";

export default Vue.extend({
    data: function () {
        return {
        };
    },
    template: `
            <div class="ag-overlay-loading-center" style="">
                <i class="fas fa-exclamation-triangle"></i> {{params.loadingMessage ? params.loadingMessage : '검색 결과가 없습니다.'}} </i>
            </div>
    `,
});
