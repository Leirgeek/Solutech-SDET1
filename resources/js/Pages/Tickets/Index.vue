<template>
    <AppLayout title="Tickets">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Tickets
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <Table :no-data-text="'No data'" :columns="columns" :data="tickets.data">
                    </Table>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-2">
            <div class="flex gap-4">
                <Button v-if="tickets.prev_page_url" type="primary"
                        @click="goToPage(tickets.prev_page_url)">
                    Previous Page
                </Button>
                <Button v-if="tickets.first_page_url" type="primary"
                        @click="goToPage(tickets.first_page_url)">
                    First Page
                </Button>
                <Button type="default" disabled>
                    On Page {{ tickets.current_page }}
                </Button>
                <Button v-if="tickets.next_page_url" type="primary"
                        @click="goToPage(tickets.next_page_url)">
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
        tickets: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            columns: [
                {
                    title: 'Ticket Holder Name',
                    key: 'name',
                    render: (h, params) => {
                        return h('span', params.row.booking?.user?.name)
                    }
                },
                {
                    title: 'Ticket Email Address',
                    key: 'gender',
                    render: (h, params) => {
                        return h('span',  params.row.booking?.user?.email)
                    }
                },
                {
                    title: 'Ticket Number',
                    key: 'ticket_number'
                },
                {
                    title: 'Created At',
                    key: 'created_at'
                }
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
