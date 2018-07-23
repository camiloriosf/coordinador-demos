import axios from "axios";
import aws from "aws-sdk";
import uuid from "uuid";
import sgMail from "@sendgrid/mail";
import moment from "moment";

const lambda = new aws.Lambda();

export const getData = async (event, context, callback) => {
  try {
    // console.log(JSON.stringify(event));
    const { queryStringParameters = {} } = event;
    const { start = "", end = "", email = "" } = queryStringParameters;
    // console.log(queryStringParameters);

    lambda.invoke(
      {
        FunctionName: "sip-serverless-dev-processData",
        Payload: JSON.stringify({ start, end, email }, null, 2), // pass params
        InvocationType: "Event"
      },
      function(error, data) {
        if (error) {
          console.log("error invoking: ", error);
        }
        if (data.Payload) {
          console.log("success: ", data.Payload);
        }
      }
    );
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        start,
        end,
        email
      })
    };

    callback(null, response);
  } catch (e) {
    console.log("error: ", e);
    const response = {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        error: true
      })
    };
  }
};

export const processData = async (event, context, callback) => {
  try {
    const { start = "", end = "", email = "" } = event;
    // const endDate = moment(end, "YYYY-MM-DD");
    // let date = moment(start, "YYYY-MM-DD");
    // const dates = [];
    // while (!date.isAfter(endDate)) {
    //   dates.push(date.format("YYYY-MM-DD"));
    //   date.add(1, "day");
    // }

    // let records = "";

    // for (const item of dates) {
    //   try {
    //     const test = await axios.get(
    //       `https://sipub.coordinador.cl/api/v1/recursos/generacion_centrales?fecha__gte=${item}&fecha__lte=${item}`,
    //       {
    //         headers: {
    //           Accept: "text/tab-separated-values-data;charset=utf-8"
    //         }
    //       }
    //     );
    //     console.log("CALL API WITH: ", item);
    //     // console.log("API RESPONSE: ", test.data);
    //     records += test.data;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    const records = await axios.get(
      `https://sipub.coordinador.cl/api/v1/recursos/generacion_centrales?fecha__gte=${start}&fecha__lte=${end}`,
      {
        headers: {
          Accept: "text/tab-separated-values-data;charset=utf-8"
        }
      }
    );
    console.log("TYPE OF DATA: ", typeof records.data);
    if (records) {
      const s3 = new aws.S3();
      const id = uuid.v1();
      await s3
        .putObject({
          Bucket: "coordinador-sip-demo",
          Key: `${id}.tsv`,
          Body: records.data,
          // Body: records,
          ContentType: "text/tab-separated-values-data; charset=utf-8",
          ContentDisposition: "attachment",
          ACL: "public-read",
          Metadata: {
            email
          }
        })
        .promise();

      lambda.invoke(
        {
          FunctionName: "sip-serverless-dev-sendEmail",
          Payload: JSON.stringify({ email, id }, null, 2), // pass params
          InvocationType: "Event"
        },
        function(error, data) {
          if (error) {
            console.log("error invoking: ", error);
          }
          if (data.Payload) {
            console.log("success: ", data.Payload);
          }
        }
      );
    }
    callback(null, `Successfully processed records`);
  } catch (e) {
    console.log("error: ", e);
    callback(null, "Error");
  }
};

export const sendEmail = async (event, context, callback) => {
  try {
    const { email = "", id = "" } = event;
    sgMail.setApiKey(
      ""
    );
    const msg = {
      to: email,
      from: "no-reply@coordinador.cl",
      subject: "Tu archivo está listo para descargar",
      text: `Descarga tu archivo desde https://s3.amazonaws.com/coordinador-sip-demo/${id}.tsv`,
      html: `Descarga tu archivo desde <a href="https://s3.amazonaws.com/coordinador-sip-demo/${id}.tsv">aquí</a>`
    };
    sgMail.send(msg);

    callback(null, `Successfully send email`);
  } catch (e) {
    console.log("error: ", e);
    callback(null, "Error");
  }
};
