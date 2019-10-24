package nmt;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//추가 import
import java.io.PrintWriter;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@WebServlet("/NMTTestServlet")
public class NMTTestServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public NMTTestServlet() {
// TODO Auto-generated constructor stub
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("NMTTestServlet doPost 메소드가 실행되었습니다.");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");

        //어떤 언어를 번역할지
        String original_source = (String)request.getParameter("original_source");
        //어떤 언어로 번역할지
        String original_target = (String)request.getParameter("original_target");
        //번역할 text 값을 받아 옵니다
        String original_str = (String)request.getParameter("original_str");

        //결과값 보내기 위한것
        PrintWriter out = response.getWriter();
        out.print((String)nmtReturnRseult(original_str, original_source, original_target));

    }

    // nmtReturnResult의 함수를 통해서 한글 - > 영어로 번역
    public String nmtReturnRseult(String original_str, String original_source, String original_target){

        //애플리케이션 클라이언트 아이디값";
        String clientId = "Ymqw2n6SrR2yaZc2o0_x";
        //애플리케이션 클라이언트 시크릿값";
        String clientSecret = "hlh4G8xPE4";

        String resultString ="";
        try {
            //original_str 값이 우리가 변환할 값
        	String source = URLEncoder.encode(original_source, "UTF-8");
        	String target = URLEncoder.encode(original_target, "UTF-8");
            String text = URLEncoder.encode(original_str, "UTF-8");

            String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            // post request
            String postParams = "source=" + source + "&target=" + target + "&text=" + text;
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            System.out.println(response.toString());

            resultString = response.toString();
        } catch (Exception e) {
            System.out.println(e);
        }

        return resultString;
    }

}