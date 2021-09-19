const submitUserFormData = {
  methods: {
    async sendUserDetailsToServer({ endpoint, userDetails }) {
      try {
        if (!userDetails || !endpoint) throw new Error("Missing arguments!");

        const {
          data: { user },
        } = await this.$http.post(endpoint, userDetails);

        if (!user) throw new Error("Error no user in resposne");

        this.$store.commit({ type: "setUser", user });

        this.$toast.open({
          message: `Welcome,${this.$options.filters.capitalize(
            user.first_name
          )} ${this.$options.filters.capitalize(user.last_name)}`,
          type: "success",
        });
        this.$router.push({ name: "Home" }).catch(e => {
          console.error(e)
        });
      } catch (error) {
        this.$toast.open({
          message: error.message,
          type: "error",
        });
      }
    }
  }
}

export default submitUserFormData;