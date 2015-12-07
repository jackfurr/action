#!/bin/sh
##
## Setup script for the  discovery databases.
##
## updatedb.sh -d<database name> -u<database username> -p<password (optional)> 
##
## This script will retrieve the current patch level from the schema_version table
## and will apply the necessary patches to bring the specified DB up to date.
##

usage()
{
cat << EOF

This script will retrieve the current patch level from the schema_version table
and will apply the necessary patches to bring the specified DB up to date.

usage: $0 -u <database username> -p <password (optional)> -h <database host> (optional, default=localhost) -d <database name>

Example:
    $0 -u toolbar -h atl-dbmaster1.att.skyfire.com -d toolbar001

OPTIONS:
   -u      MySQL user name
   -p      MySQL user password password
   -d      MySQL database name
   -h      MySQL host

EOF
}

GOT_PASSWD=0
DB_USER=
DB_HOST="localhost"
DB=""

while getopts :d:u:p:h: arg; do
	case $arg in
		u) DB_USER="$OPTARG";;
		p) GOT_PASSWD=1; MYSQL_PASSWD="$OPTARG";;
		h) DB_HOST="$OPTARG";;
		d) DB="$OPTARG";;
	esac
done
shift `expr $OPTIND - 1`


if [ -z $DB_USER ]
then
    usage
    exit
fi

if [ $GOT_PASSWD -eq 0 ]
then
    read -p "MySQL passwd: " MYSQL_PASSWD
fi

echo "Updating '$DB' database..."

current_level=`mysql -e "SELECT patch_level FROM $DB.schema_version" --host=$DB_HOST --user=$DB_USER --password=$MYSQL_PASSWD --batch --skip-column-names `
if [ $? != 0 ]
then
	# we had an error. My guess is that the schema_version table does not exist
	current_level=0
fi

echo "Current patch level for '$DB': $current_level"

for level in `ls ./patch-*.sql | sed 's:./patch-::' | sed 's:.sql::'`
do
  if [ $level -gt $current_level ]
  then
    (
     echo "######## Applying patch $level";
	 #cd ./patch$level &&
	 #/bin/sh ./apply.sh --host=$DB_HOST --user=$DB_USER --password=$MYSQL_PASSWD $DB &&
	 mysql --host=$DB_HOST --user=$DB_USER --password=$MYSQL_PASSWD $DB < ./patch-$level.sql
	 mysql -e "update $DB.schema_version set patch_level=$level" --host=$DB_HOST --user=$DB_USER --password=$MYSQL_PASSWD
	 )
	 if [ $? -ne 0 ]
	 then
	     echo "         Update FAILED!"
	     exit 1
	 else
    	 echo "         Done with patch $level."
	 fi

  fi
done

echo "Done!"
