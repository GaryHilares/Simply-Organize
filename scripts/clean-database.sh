if [ $# -ne 1 ]
then
    echo "2 command line arguments are required"
else
    curl -X DELETE "$1/api/daily-entries/clean"
fi