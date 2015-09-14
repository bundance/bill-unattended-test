module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    keepalive: true,
                    base: 'app/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};