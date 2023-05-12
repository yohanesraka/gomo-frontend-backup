import { useToast } from 'vue-toastification';
import { mapState } from 'pinia';

import useSiteMeta from '@/stores';
import useAuthStore from '@/stores/auth';

import BaseAlert from '@/components/BaseAlert.vue';
import NotificationComp from '@/components/Notification.vue';

export default {
  components: {
    BaseAlert,
  },
  computed: {
    ...mapState(useSiteMeta, ['siteMeta']),
    ...mapState(useAuthStore, ['userInfo', 'isLoggedIn']),
  },
  methods: {
    notify(text, type = true, icon = 'fas fa-bell') {
      const message = text?.code === 'EMPTY_RESULT' ? 'Data Kosong!' : text?.errors?.[0] || text;
      const content = {
        component: NotificationComp,
        props: {
          ownText: message,
          ownIcon: icon,
          text: message,
          type: type ? 'success' : 'danger',
        },
      };
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        closeButton: false,
        position: 'bottom-right',
      });
    },
  },
};
