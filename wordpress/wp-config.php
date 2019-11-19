<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'webContent' );

/** MySQL database username */
define( 'DB_USER', 'content' );

/** MySQL database password */
define( 'DB_PASSWORD', 'web@content' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '6bFI oS-YlQk}&OZjrGL}vhR*M48d_C9hlM-@r8j)+rfD_fM2l6BB1&2.Gj{^idr');
define('SECURE_AUTH_KEY',  '5.Dn[~ZVYGXgyx+g%g7ux?4@u-, Bf/|%B#;rcPCL}9@J`q(r+^btLKWQ* H52Gu');
define('LOGGED_IN_KEY',    'tne/++JTOzo-_]-g~2+j|%nT$^:FDl3_tEOXG=LJ`Fn0d^ppyBPY#7$XO;=WB*pi');
define('NONCE_KEY',        ':8Q*qkeH[+Y;w]:>t+P0HY+$&3GsW~=D)tikg<|-j|Gv.=5+)1iwTBdB`!=2*G[$');
define('AUTH_SALT',        '{%>+sBY88T+6m-D+7[1Z05_,c+?:mb^gs,B5X|]Y|cjW>`pL88Zx(&VPZeM+*4Tc');
define('SECURE_AUTH_SALT', 'vxk3*l+,jj#k!26+$&<VAET0^fX+O4<]I=z#Am#yJCt:qjU]+lpjXB65KuCubyT^');
define('LOGGED_IN_SALT',   'q%7^@LUo59+JjN2sVyN,T{5*nO;yADn6@t]T&Jm^NgrY[n8+Q #<;YZud>i-E}KW');
define('NONCE_SALT',       'wXE^c0qLyAB5*GmH1|Ez-d+e|jUcXqF=YQ 7IfpJ&#pU?RjAqN}Jnk/BE8U=>]BO');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
