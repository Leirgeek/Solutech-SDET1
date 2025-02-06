<template>
    <AppLayout title="Bookings">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Bookings
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <Table :no-data-text="'No data'" :columns="columns" :data="data">
                    </Table>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-2">
            <div class="flex gap-4">
                <Button v-if="bookings.prev_page_url" type="primary"
                        @click="goToPage(bookings.prev_page_url)">
                    Previous Page
                </Button>
                <Button v-if="bookings.first_page_url" type="primary"
                        @click="goToPage(bookings.first_page_url)">
                    First Page
                </Button>
                <Button type="default" disabled>
                    On Page {{ bookings.current_page }}
                </Button>
                <Button v-if="bookings.next_page_url" type="primary"
                        @click="goToPage(bookings.next_page_url)">
                    Next Page
                </Button>
            </div>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import {Table} from "view-ui-plus";
import {Button, Modal} from "view-ui-plus";

export default {
    components: {
        Table,
        AppLayout,
        Button,
        Modal
    },
    props: {
        bookings: {
            type: Object,
            required: true
        }
    },
    created: function () {
        this.data = this.bookings.data;
    },
    data() {
        return {
            columns: [
                {
                    title: 'Booked By',
                    key: 'name',
                    render: (h, params) => {
                        return h('span', params.row.user?.name)
                    }
                },
                {
                    title: 'Tour Name',
                    key: 'gender',
                    render: (h, params) => {
                        return h('span', params.row.tour?.name)
                    }
                },
                {
                    title: 'Status',
                    key: 'status'
                },
                {
                    title: 'Ticket Number',
                    key: 'status',
                    render: (h, params) => {
                        return h('span', params.row.ticket?.ticket_number)
                    }
                },
                {
                    title: 'Created At',
                    key: 'created_at'
                }
            ],
            data: [

            ]
        }
    },
    methods: {
        goToPage(url) {
            this.start_loading();
            this.$inertia.visit(url)
            this.stop_loading();
        }
    }
}
</script>
