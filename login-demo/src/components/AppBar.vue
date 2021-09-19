<template>
	<v-app-bar app color="primary" dark>
		<div class="d-flex align-center">
			<v-img
				alt="Vuetify Logo"
				class="shrink mr-2"
				contain
				src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
				transition="scale-transition"
				width="40"
			/>
			<h1>Demo Auth App</h1>
		</div>
		<v-spacer></v-spacer>
		<v-btn color="warning" v-if="user" @click="logout">Log out</v-btn>
		<v-btn
			color="success"
			v-else-if="$route.name !== 'Register'"
			@click="register"
			>Register</v-btn
		>
	</v-app-bar>
</template>

<script>
export default {
	name: "AppBar",
	props: { user: { type: Object } },
	methods: {
		register() {
			this.$router.push({ name: "Register" });
		},
		logout() {
			this.$store.commit({ type: "logout" });
		},
	},
};
</script>
