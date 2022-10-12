docker run --rm --network="host" \
    -v=${PWD}/ReadyAPI_Tests:/ReadyAPI_Tests \
    -e SLM_LICENSE_SERVER="https://api.slm.manage.smartbear.com:443" \
    -e API_KEY=${SLM_API_KEY} \
    -e ENDPOINT=${ENDPOINT} \
    -e COMMAND_LINE="'-e${ENDPOINT}' '-f/ReadyAPI_Tests/reports' '-RJUnit-Style HTML Report' /ReadyAPI_Tests/SmartBearCoin-Payee-Provider-readyapi-project.xml" \
    smartbear/ready-api-soapui-testrunner:latest
