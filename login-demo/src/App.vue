<template>
	<v-app>
		<app-bar :user="user" />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import AppBar from "./components/AppBar";
export default {
	components: { AppBar },
	name: "App",
	data() {
		return {};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	beforeCreate() {
		this.$store.dispatch({ type: "checkLocalStorageForUser" })
		// .then((res) => {
		// 	this.$router.push("/");
		// });
	},
};
</script>
