rm -f index.zip
cd src
zip -r ../index.zip *
cd ..
aws lambda update-function-code --function-name contact --zip-file fileb://index.zip
