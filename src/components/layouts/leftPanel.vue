  
<template>
  <v-navigation-drawer fixed clipped app v-model="$store.state.drawner">
    <v-list dense>
      <v-list-item avatar tag="div" v-if="$vuetify.breakpoint.mdAndDown">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-list-item-icon></v-list-item-icon>
      </v-list-item>
      <v-divider v-if="$vuetify.breakpoint.mdAndDown"></v-divider>
      <v-subheader class="mt-3 text--white">GESTION USUARIOS</v-subheader>
      <router-link class="router-links" to="/" exact>
        <v-list-item href="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>INICIO</v-list-item-title>
        </v-list-item>
      </router-link>
    <router-link class="router-links" to="/mapa" exact>
        <v-list-item href="/mapa">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>VER MAPA</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
        <router-link class="router-links" :to="subItem.action" v-for="subItem in item.items" :key="subItem.title">
          <v-list-item>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>

            <v-list-item-action>
              <v-icon light>{{ item.action }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </router-link>

      </v-list-group>

            
    <v-list-group prepend-icon="group" no-action>
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>MI CUENTA</v-list-item-title>
          </v-list-item>
        </template>
        <router-link class="router-links" to="/profile">
          <v-list-item>
            <v-list-item-title>Mi perfil</v-list-item-title>

            <v-list-item-action>
              <v-icon light>group</v-icon>
            </v-list-item-action>
          </v-list-item>
        </router-link>
                <router-link class="router-links" to="/publicar-predio">
          <v-list-item>
            <v-list-item-title>Publicar predio</v-list-item-title>

            <v-list-item-action>
              <v-icon light>group</v-icon>
            </v-list-item-action>
          </v-list-item>
        </router-link>

      </v-list-group>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created() {
    //
  },
  data: () => ({
    items: [{
        action: 'account_circle',
        title: 'Clientes',
        items: [{
            title: 'Listar Clientes',
            action: '/cliente'
          },
          {
            title: 'Crear Cliente',
            action: '/cliente/create'
          }
        ]
      },
      {
        action: 'description',
        title: 'Factura',
        items: [{
            title: 'Listar Facturas',
            action: '/facturas'
          },
          {
            title: 'Crear Factura',
            action: '/facturas/create'
          }
        ]
      },
      {
        action: 'archive',
        title: 'Productos',
        items: [{
            title: 'Listar Productos',
            action: '/productos'
          },
          {
            title: 'Crear Producto',
            action: '/productos/create'
          }
        ]
      },
      {
        action: 'group',
        title: 'MI CUENTA',
        items: [{
            title: 'Mi Perfil',
            action: '/profile'
          },
          {
            title: 'Publicar Predio',
            action: '/publicar-predio'
          }
        ]
      }
    ]
  }),
  methods: {
    drawerMDown: function () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.$root.drawer = false;
      }
    }
  },
}
</script>

<style>
  .menu:before {
    background: linear-gradient(0deg,rgba(44,44,44,.2),rgba(255, 255, 255, 0.6));
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .menu {
    background: url('https://demos.creative-tim.com/now-ui-kit-angular/assets/img/header.jpg') 35% 0 / cover no-repeat scroll;
  }
  .v-navigation-drawero .v-listo,
  .theme--lighto.v-listo {
    background: none;
  }
  .v-list__group__header--activeo {
    background-color: rgba(151, 153, 162, 0.4);
    border-radius: 0 0 20px 20px;
    box-shadow: 0px 0px 2px #000000;
  }
  .v-list__group__header--activeo .v-list__group__header__prepend-icono .v-icono {
    color: #ffffff;
  }
  .router-linkso {
    color: #ffffff;
    text-decoration: none;
  }
  .router-link-exact-activeo {
    color: #ffffff;
  }
  .router-link-activeo {
    background-color: #f00;
        color: burlywood;
  }
</style>