import Vue from "vue";

export default Vue.extend({
    data: function () {
        return {
        };
    },
    template: `
            <div class="ag-overlay-loading-center" style="">
                <i class="fas fa-hourglass-half"> {{params.loadingMessage ? params.loadingMessage : '로딩중...'}} </i>
            </div>
    `
});
